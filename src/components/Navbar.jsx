import { FaSearch, FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      {/* Barra de búsqueda */}
      <div className="flex items-center bg-gray-100 p-2 rounded-lg w-1/3">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search here"
          className="bg-transparent outline-none px-2 w-full"
        />
      </div>

      {/* Notificaciones y usuario */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-gray-700">Francisco V.</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;