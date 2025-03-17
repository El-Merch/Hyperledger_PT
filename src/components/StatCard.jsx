function StatCard({ title, value, percentage, icon, color }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className={`text-${color}-500 text-3xl`}>{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
          <p className="text-green-500 text-sm">+{percentage}</p>
        </div>
      </div>
    );
  }
  
  export default StatCard;
  