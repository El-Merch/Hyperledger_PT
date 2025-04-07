import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext"; // Asegúrate de importar bien
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import "./index.css";

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // 🔥 Ahora useAuth está definido
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <div className="flex h-screen w-screen bg-gray-100">
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                </div>
                <div className="pt-10 min-h-screen w-full bg-gray-100 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-4 bg-gray-100">
                    <Dashboard />
                  </main>
                </div>
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;