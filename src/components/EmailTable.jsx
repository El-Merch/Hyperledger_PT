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
            <th className="p-2 text-gray-600">Email</th>
            <th className="p-2 text-gray-600">Campaign</th>
            <th className="p-2 text-gray-600">Status</th>
            <th className="p-2 text-gray-600">Time</th>
            <th className="p-2 text-gray-600">Emails Sent</th>
            <th className="p-2 text-gray-600">Open Rate</th>
            <th className="p-2 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 whitespace-nowrap">{email.subject}</td>
              <td className="p-2 whitespace-nowrap">{email.campaign}</td>
              <td className="p-2 text-green-500 font-semibold whitespace-nowrap">{email.status}</td>
              <td className="p-2 whitespace-nowrap">{email.time}</td>
              <td className="p-2 whitespace-nowrap">{email.sent}</td>
              <td className="p-2 whitespace-nowrap">{email.openRate}</td>
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
