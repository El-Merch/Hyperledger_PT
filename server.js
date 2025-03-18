import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Habilitar CORS para permitir solicitudes desde React
app.use(cors());

// Datos simulados de correos electrónicos
const emails = [
  { remitente: "Semillacun", desc: "ZH, BRO, JM", estado: "Verificando...", fecha_entrada: "02/03/2024 - 1:35pm" },
  { remitente: "GreenMart", desc: "CHI, PIN, TOM", estado: "Procesado", fecha_entrada: "02/03/2024 - 1:35pm" },
  { remitente: "ChosenFarm", desc: "ARU, CIL", estado: "No Apto", fecha_entrada: "02/03/2024 - 1:35pm" },
];

// Ruta para obtener los emails
app.get("/api/emails", (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
