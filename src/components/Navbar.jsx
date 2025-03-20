import { FaSearch, FaBell } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth(); // Obtener el usuario autenticado

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center fixed top-0 left-2 w-full z-20 md:pl-64 transition-all duration-300 pl-24">
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
    {/* Nombre del usuario autenticado */}
    <span className="text-gray-800 font-medium">{user ? user.usuario : "Usuario"}</span>
    <button 
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/"; // Redirigir al login después del logout
      }} 
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
      Cerrar sesión
    </button>
  </div>
</div>
    </div>
  );
}

export default Navbar;