function StatCard({ title, value, percentage, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 w-full h-20">
      <div className={`text-${color}-500 text-3xl`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
        <p className="text-green-500 text-xs">+{percentage}</p>
      </div>
    </div>
  );
}
  
  export default StatCard;
  