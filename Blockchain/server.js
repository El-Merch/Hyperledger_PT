import fs from "fs";
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import pkg from "pg";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Gateway, Wallets } from 'fabric-network';

// Obtener el __dirname equivalente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5001;

// Configurar CORS y JSON
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Configurar conexión con PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "your-rds-endpoint",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASS || "postgres",
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,  // Rechazar conexiones con certificados no autorizados (útil para desarrollo)
    ca: fs.readFileSync('certs/us-east-2-bundle.pem'),  // Ruta al archivo .pem
  }
});

export default pool;
// 🔹 Ruta de prueba
app.get("/", (req, res) => {
  res.send("✅ API funcionando 🚀");
});

// 🔹 Obtener lista de usuarios (para verificar conexión)
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, nombre_usuario FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// 🔹 LOGIN sin bcrypt
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    console.log(`🔹 Contraseña ingresada: "${password}"`);
    console.log(`🔹 Contraseña en la base de datos: "${user.password}"`);

    // Comparación de contraseñas en texto plano
    if (password !== user.password) {
      console.log("❌ No coinciden");
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    console.log("✅ Coinciden");

    // Crear token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "secreto123", { expiresIn: "1h" });

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        nombre_usuario: user.nombre_usuario // Asegurar que se retorne el nombre_usuario
      } 
    });
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// 🔹 Obtener lista de emails (pedidos)
app.get("/api/emails", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pedidos");
    const emails = result.rows;

    // Obtener la línea de tiempo para cada pedido
    for (let email of emails) {
      const timelineResult = await pool.query(
        "SELECT * FROM timeline WHERE pedido_id = $1 ORDER BY date ASC",
        [email.id]
      );
      email.timeline = timelineResult.rows;
    }

    res.json(emails);  // Responder con los emails y sus timelines
  } catch (error) {
    console.error("Error al obtener los emails:", error);
    res.status(500).send("Error al obtener los emails");
  }
});

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define la carpeta 'uploads' para almacenar los archivos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtener extensión de archivo
    cb(null, Date.now() + ext); // Asignar un nombre único a los archivos
  }
});

// Filtro de archivos: solo permitir XML y PDF
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'text/xml']; // Tipos MIME permitidos (PDF y XML)
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Tipo de archivo no permitido'), false); // Error si el archivo no es XML ni PDF
  }
  cb(null, true); // Permitir el archivo si es válido
};

// Inicializar multer con el almacenamiento y el filtro de archivos
const upload = multer({ storage, fileFilter });

// Función para generar el hash MD5
const generateMD5Hash = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5'); // Crear un hash MD5
    const stream = fs.createReadStream(filePath); // Leer el archivo

    stream.on('data', (chunk) => {
      hash.update(chunk); // Actualizar el hash con cada trozo de datos
    });

    stream.on('end', () => {
      resolve(hash.digest('hex')); // Cuando termine, devuelve el hash
    });

    stream.on('error', (error) => {
      reject(error); // Maneja errores de lectura del archivo
    });
  });
};
// Endpoint para manejar la carga de los archivos XML y PDF
app.post("/api/uploadDocuments", upload.fields([{ name: "xml" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { xml, pdf } = req.files;

    // Verificar si ambos archivos fueron subidos
    if (!xml || !pdf) {
      return res.status(400).json({ message: "Ambos archivos son requeridos (XML y PDF)." });
    }

    // Guardar las rutas de los archivos en la base de datos
    const xmlPath = xml[0].path;
    const pdfPath = pdf[0].path;
    const emailId = req.body.emailId;


    // Generar el hash MD5 del archivo PDF
    const pdfHash = await generateMD5Hash(pdfPath);
    
    // Generar el timestamp antes de hacer las consultas
    const timestamp = new Date();

    // Realiza una consulta para guardar las rutas en tu base de datos
    await pool.query(
      "UPDATE pedidos SET xml_path = $1, pdf_path = $2, pdf_hash = $3, estado = 'Procesando...' WHERE id = $4",
      [xmlPath, pdfPath, pdfHash, emailId]
    );

    // Actualizar el estado de la timeline si está en "in-progress"
    await pool.query(
      "UPDATE timeline SET status = 'completed' WHERE pedido_id = $1 AND status = 'in-progress'",
      [emailId]
    );

    // Agregar entrada en la tabla timeline
    await pool.query(
      "INSERT INTO timeline (pedido_id, label, date, status) VALUES ($1, 'Documentos Recibidos', $2, 'completed')",
      [emailId, timestamp]
    );

    await submitToBlockchain(emailId, pdfHash);

    // Agregar entrada en la tabla timeline
    await pool.query(
      "INSERT INTO timeline (pedido_id, label, date, status) VALUES ($1, 'Documentos procesados', $2, 'in-progress')",
      [emailId, timestamp]
    );

    console.log("Archivos subidos correctamente:", xml[0].path, pdf[0].path);

    // Responder si la carga fue exitosa
    res.json({ success: true, message: "Archivos subidos correctamente." });
  } catch (error) {
    console.error("Error al subir los archivos:", error);
    
    if (error.message === 'Tipo de archivo no permitido') {
      return res.status(400).json({ message: "Solo se permiten archivos PDF y XML." });
    }
    res.status(500).json({ message: "Error al subir los archivos." });
  }
});

// Función para interactuar con Hyperledger Fabric y subir datos
const submitToBlockchain = async (emailId, pdfHash) => {
  try {
    // Cargar configuración de red
    const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
    const wallet = await Wallets.newFileSystemWallet('./wallet'); // Usando 'Wallets'
    const gateway = new Gateway();

    await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('mychaincode', 'mycontract');

    // Llamar a la función de la cadena de bloques para registrar el pedido
    await contract.submitTransaction('storePdfHash', emailId, pdfHash);

    console.log('Hash del PDF registrado correctamente en la blockchain');
    await gateway.disconnect();
  } catch (error) {
    console.error('Error al registrar el hash en la blockchain:', error);
    throw new Error('Error al registrar el hash en la blockchain');
  }
};
