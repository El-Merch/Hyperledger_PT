import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Habilitar CORS para permitir solicitudes desde React
app.use(cors());

// Datos simulados de correos electrónicos
const emails = [
  { subject: "Discover our new app features", campaign: "New app launch", status: "Sent", time: "02/03/2024 at 1:35pm", sent: 2183, openRate: "35%" },
  { subject: "Abandoned cart", campaign: "Automated Email", status: "Sent", time: "02/03/2024 at 1:35pm", sent: 2183, openRate: "35%" },
  { subject: "Discover our new app features", campaign: "New app launch", status: "Sent", time: "02/03/2024 at 1:35pm", sent: 2183, openRate: "35%" },
];

// Ruta para obtener los emails
app.get("/api/emails", (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
