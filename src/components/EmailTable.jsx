import React, { useState, useEffect } from "react";
import { format } from "date-fns";  // Importar la función format de date-fns
import Modal from "./Modal_view"; // Importar el componente Modal

function EmailTable() {
  const [emails, setEmails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    fetchEmails();  // Llamar a la función para obtener los emails cuando el componente se monta
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/emails");
      const data = await response.json();
      setEmails(data);  // Actualizar el estado de emails con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los emails:", error);
    }
  };

  return (
    <div>
      {/* Modal con la Timeline */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedEmail={selectedEmail} 
        fetchEmails={fetchEmails}  // Pasamos fetchEmails como prop al Modal
      />

      {/* Tabla de Emails */}
      <div className="bg-white p-6 rounded-lg shadow mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-gray-600">Remitente</th>
              <th className="p-2 text-gray-600">Descripción</th>
              <th className="p-2 text-gray-600">Status</th>
              <th className="p-2 text-gray-600">Fecha</th>
              <th className="p-2 text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 whitespace-nowrap">{email.remitente}</td>
                <td className="p-2 whitespace-nowrap">{email.descripcion}</td>
                <td className={`p-2 font-semibold whitespace-nowrap ${
                  email.estado === "Verificando..." ? "text-yellow-500" :
                  email.estado === "Procesado" ? "text-green-500" :
                  email.estado === "Procesando..." ? "text-orange-500" :
                  "text-red-500"
                }`}>
                  {email.estado}
                </td>
                <td className="p-2 whitespace-nowrap">
                  {email.fecha_entrada ? format(new Date(email.fecha_entrada), 'dd/MM/yyyy HH:mm') : 'Fecha no disponible'}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEmail(email);  // Asignar el email seleccionado
                      setModalOpen(true);  // Abrir el modal con la Timeline
                    }} 
                    className="view px-3 py-1 text-black rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button className="delete px-3 py-1 text-white rounded hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmailTable;
