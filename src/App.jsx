import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./index.css"; // Asegura que los estilos globales están cargados

function App() {
  return (
    <Router>
      <div className="flex h-screen w-screen bg-gray-100">
        {/* Sidebar con ancho fijo */}
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
        </div>

        {/* Contenido principal ocupa todo el espacio restante */}
        <div className="pt-10 min-h-screen w-full bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;