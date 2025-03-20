import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaEnvelope, FaCogs, FaUsers, FaChartPie, FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botón de menú en móviles */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 bg-gray-200 rounded-full z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay para cerrar el menú */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg p-4 pt-16 transition-transform duration-300 z-30 ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        } md:translate-x-0 md:w-64 md:relative`}
      >
        <h2 className="text-xl font-bold text-gray-700 mb-6">EcoChain</h2>
        <nav className="flex flex-col space-y-4">
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
    </div>
  );
}

export default Sidebar;
