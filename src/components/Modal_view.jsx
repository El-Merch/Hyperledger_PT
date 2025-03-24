import React from "react";
import { format, setWeek } from "date-fns";
import Timeline from "./Timeline"; // Asegúrate de importar el componente Timeline


const Modal = ({ isOpen, onClose, selectedEmail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 animate-slide-up relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Detalles del Email</h2>
        <p><strong>Remitente:</strong> {selectedEmail.remitente}</p>
        <p><strong>Descripción:</strong> {selectedEmail.desc}</p>
        <p><strong>Estado:</strong> {selectedEmail.estado}</p>
        <p>
          <strong>Fecha de Entrada:</strong> 
          {selectedEmail.fecha_entrada ? format(new Date(selectedEmail.fecha_entrada), 'dd/MM/yyyy HH:mm') : 'Fecha no disponible'}
        </p>

        {/* Agregar la Timeline en el modal */}
        <h3 className="mt-6 text-lg font-semibold">Línea de Tiempo</h3>
        <Timeline timeline={selectedEmail.timeline} />
      </div>
    </div>
  );
};

export default Modal;
