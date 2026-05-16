import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrar } from "../services/Auth";
import "../components/styles/Registrar.css";

function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const navigate = useNavigate();

  const handleRegistro = async () => {
    if (!username || !password) {
      setMensaje("Completa los campos");
      setTipoMensaje("error");
      return;
    }

    try {
      await registrar(username, password);

      setMensaje("Usuario creado correctamente");
      setTipoMensaje("success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setMensaje(error.message);
      setTipoMensaje("error");
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
        <h3 className="login-title">Registro</h3>

        
        {mensaje && (
          <div className={`login-alert ${tipoMensaje}`}>
            {mensaje}
          </div>
        )}

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
          onClick={handleRegistro}
        >
          Registrarse
        </button>

        <p className="login-text">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="login-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;