function EmailTable() {
    const emails = [
      { subject: "Discover our new app features", campaign: "New app launch", status: "Sent", time: "02/03/2024 at 1:35pm", sent: 2183, openRate: "35%" },
      { subject: "Abandoned cart", campaign: "Automated Email", status: "Sent", time: "02/03/2024 at 1:35pm", sent: 2183, openRate: "35%" },
      { subject: "Discover our new app features", campaign: "New app launch", status: "Sent", time: "02/03/2024 at 1:35pm", sent: 2183, openRate: "35%" },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-gray-600">Email</th>
              <th className="p-2 text-gray-600">Campaign</th>
              <th className="p-2 text-gray-600">Status</th>
              <th className="p-2 text-gray-600">Time</th>
              <th className="p-2 text-gray-600">Emails Sent</th>
              <th className="p-2 text-gray-600">Open Rate</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{email.subject}</td>
                <td className="p-2">{email.campaign}</td>
                <td className="p-2 text-green-500 font-semibold">{email.status}</td>
                <td className="p-2">{email.time}</td>
                <td className="p-2">{email.sent}</td>
                <td className="p-2">{email.openRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default EmailTable;
  