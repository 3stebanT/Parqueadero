import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/Auth";
import "../components/styles/LoginForm.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(username, password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      
      {/* Botón volver */}
      <button
        onClick={() => navigate("/")}
        className="login-back"
      >
        ←
      </button>

      {/* Card */}
      <div className="login-card">
        <h3 className="login-title">Iniciar Sesión</h3>

        <input
          type="text"
          className="login-input"
          placeholder="Usuario"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="login-input"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Ingresar
        </button>

        <p className="login-text">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="login-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;