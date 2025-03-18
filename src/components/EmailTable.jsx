import { useState, useEffect } from "react";

function EmailTable() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/emails")
      .then((response) => response.json())
      .then((data) => setEmails(data))
      .catch((error) => console.error("Error al obtener los emails:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4 overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-gray-600">Remitente</th>
            <th className="p-2 text-gray-600">Descripción</th>
            <th className="p-2 text-gray-600">Status</th>
            <th className="p-2 text-gray-600">Time</th>
            <th className="p-2 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 whitespace-nowrap">{email.remitente}</td>
              <td className="p-2 whitespace-nowrap">{email.desc}</td>
              <td className="p-2 text-green-500 font-semibold whitespace-nowrap">{email.estado}</td>
              <td className="p-2 whitespace-nowrap">{email.fecha_entrada}</td>
              <td className="p-2 flex gap-2">
                <button className="view px-3 py-1 text-black rounded hover:bg-blue-600 transition">View</button>
                <button className="delete px-3 py-1 text-white rounded hover:bg-red-600 transition">Delete</button>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailTable;
