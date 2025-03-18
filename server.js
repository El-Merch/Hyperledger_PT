import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Habilitar CORS para permitir solicitudes desde React
app.use(cors());

// Datos simulados de correos electrónicos
const emails = [
  { 
    remitente: "Semillacun", 
    desc: "ZH, BRO, JM", 
    estado: "Verificando...", 
    fecha_entrada: "02/03/2024 - 1:35pm",
    timeline: [
      { label: "Entrada", date: "02/03/2024 - 1:35pm", status: "completed" },
      { label: "Verificación", date: "02/03/2024 - 3:00pm", status: "in-progress" }
    ]
  },
  { 
    remitente: "GreenMart", 
    desc: "CHI, PIN, TOM", 
    estado: "Procesado", 
    fecha_entrada: "02/03/2024 - 1:35pm",
    timeline: [
      { label: "Entrada", date: "02/03/2024 - 1:35pm", status: "completed" },
      { label: "Verificación", date: "02/03/2024 - 3:00pm", status: "completed" },
      { label: "Verificación Aceptada", date: "02/03/2024 - 4:00pm", status: "completed" },
      { label: "Esperando Documentos", date: "02/03/2024 - 6:00pm", status: "completed" },
      { label: "Documentos Recibidos", date: "02/03/2024 - 6:30pm", status: "completed" },
      { label: "Documentos Procesados", date: "02/03/2024 - 7:00pm", status: "completed" }
    ]
  },
  { 
    remitente: "ChosenFarm", 
    desc: "ARU, CIL", 
    estado: "No Apto", 
    fecha_entrada: "02/03/2024 - 1:35pm",
    timeline: [
      { label: "Entrada", date: "02/03/2024 - 1:35pm", status: "completed" },
      { label: "Verificación", date: "02/03/2024 - 3:00pm", status: "completed" },
      { label: "No pasó Verificación", date: "02/03/2024 - 4:00pm", status: "failed" },
      { label: "Devolución", date: "02/03/2024 - 5:00pm", status: "failed" }
    ]
  }
];

// Ruta para obtener los emails
app.get("/api/emails", (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
