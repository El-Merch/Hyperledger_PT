import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../login.css"; // Importar el CSS
import logo from "../assets/logo.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      login(data.user.username, data.user.fullName, data.token);

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div class="cont-log">
    <div className="login-container">
      {/* Panel izquierdo */}
      <div className="login-left">
      <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">Inicia Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button className="login-button">Entrar</button>
        </form>
      </div>

      {/* Panel derecho con imagen */}
      <div className="login-right"></div>
    </div>
    </div>

  );
};

export default Login;