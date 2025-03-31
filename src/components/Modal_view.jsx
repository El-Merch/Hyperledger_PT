import React, { useState } from "react";
import Timeline from "./Timeline"; // Asegúrate de importar el componente Timeline
import { format } from "date-fns";

const Modal = ({ isOpen, onClose, selectedEmail }) => {
  const [xmlFile, setXmlFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isXmlSelected, setIsXmlSelected] = useState(false); // Estado para XML
  const [isPdfSelected, setIsPdfSelected] = useState(false); // Estado para PDF

  if (!isOpen) return null;

  // Manejador de archivos
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "xml") {
      setXmlFile(file);
      setIsXmlSelected(true); // Cuando se selecciona el archivo XML
    } else if (type === "pdf") {
      setPdfFile(file);
      setIsPdfSelected(true); // Cuando se selecciona el archivo PDF
    }
  };

  // Función para subir los archivos
  const handleUpload = async () => {
    if (!xmlFile || !pdfFile) {
      alert("Debes seleccionar ambos archivos.");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("xml", xmlFile);
    formData.append("pdf", pdfFile);
    formData.append("emailId", selectedEmail.id);

    try {
      // Aquí harás la solicitud al backend para subir los archivos
      const response = await fetch("http://localhost:5000/api/uploadDocuments", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Archivos subidos correctamente.");
        onClose(); // Cerrar modal si la carga fue exitosa
      } else {
        alert("Error al subir los archivos.");
      }
    } catch (error) {
      console.error("Error al subir los archivos:", error);
      alert("Error al subir los archivos.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 animate-slide-up relative">
        {/* Botón de Cerrar */}
        <button
          className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
          onClick={onClose}
        >
          <span className="text-xl">×</span> {/* Icono de la 'X' */}
        </button>

        <h2 className="text-lg font-bold mb-4">Detalles del Email</h2>

        <div className="mb-4">
          <p><strong>Remitente:</strong> {selectedEmail.remitente}</p>
          <p><strong>Descripción:</strong> {selectedEmail.desc}</p>
          <p><strong>Estado:</strong> {selectedEmail.estado}</p>
          <p>
            <strong>Fecha de Entrada:</strong> 
            {selectedEmail.fecha_entrada ? format(new Date(selectedEmail.fecha_entrada), 'dd/MM/yyyy HH:mm') : 'Fecha no disponible'}
          </p>
        </div>

        {/* Agregar la Timeline en el modal */}
        <h3 className="mt-6 text-lg font-semibold">Línea de Tiempo</h3>
        <Timeline timeline={selectedEmail.timeline} />

        {/* Si el estado es "Esperando Documentos", mostrar el botón de carga de archivos */}
        {selectedEmail.estado === "Esperando Documentos" && (
        <div className="mb-4" id="contenedor_archivos">
          {/* Botón para seleccionar archivo XML */}
          <input
            id="xml"
            type="file"
            accept=".xml"
            onChange={(e) => handleFileChange(e, "xml")}
            className="hidden"
          />
          <button
            type="button"
            id={`${isXmlSelected ? 'boton_xml' : 'boton_xml_no_seleccionado'}`} // Cambia el id aquí
            className="w-full py-2 px-4 rounded-md transition"
            onClick={() => document.getElementById('xml').click()}
          >
            {isXmlSelected ? "Archivo XML Seleccionado" : "Elegir archivo XML"}
          </button>

          {/* Botón para seleccionar archivo PDF */}
          <input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "pdf")}
            className="hidden"
          />
          <button
            type="button"
            id={`${isPdfSelected ? 'boton_pdf' : 'boton_pdf_no_seleccionado'}`} // Cambia el id aquí
            className="w-full py-2 px-4 rounded-md transition"
            onClick={() => document.getElementById('pdf').click()}
          >
            {isPdfSelected ? "Archivo PDF Seleccionado" : "Elegir archivo PDF"}
          </button>


          {/* Botón para subir los archivos */}
          {xmlFile && pdfFile && (
            <button
              className="mt-4 w-full py-2 px-4 text-white rounded-md transition bg-green-500 hover:bg-green-600"
              id="boton_subir_archivos"
              onClick={handleUpload}
            >
              Subir Archivos
            </button>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
