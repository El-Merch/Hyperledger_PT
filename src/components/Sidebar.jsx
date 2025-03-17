import { Link } from "react-router-dom";
import { FaTachometerAlt, FaEnvelope, FaCogs, FaUsers, FaChartPie } from "react-icons/fa";

function Sidebar() {
    return (
        <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">

        <h2 className="text-xl font-bold text-gray-700 mb-6">EcoChain</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded">
            <FaTachometerAlt className="text-green-500" />
            <span>Dashboard</span>
          </Link>
          <Link to="/campaigns" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded">
            <FaEnvelope className="text-green-500" />
            <span>Campaigns</span>
          </Link>
          <Link to="/reports" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded">
            <FaChartPie className="text-green-500" />
            <span>Reports</span>
          </Link>
          <Link to="/customers" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded">
            <FaUsers className="text-green-500" />
            <span>Customers</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded">
            <FaCogs className="text-green-500" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    );
  }
  
  export default Sidebar;