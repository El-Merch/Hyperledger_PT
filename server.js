import "dotenv/config.js";
import express from "express";
import cors from "cors";
import pkg from "pg";
import jwt from "jsonwebtoken";

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
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASS || "postgres",
  port: process.env.DB_PORT || 5432,
});

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
        fullName: user.nombre_usuario // Asegurar que se retorne el nombre_usuario
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