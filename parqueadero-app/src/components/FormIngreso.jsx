import { useState } from "react";
import { crearVehiculo } from "../services/api";
import "./styles/FormIngreso.css";

function FormIngreso({ recargar }) {
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("carro");

  // 🔥 NUEVO: estados para mensajes
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const validarPlaca = (placa) => {
    const regex = /^(?=(?:.*[A-Za-z]){3,})(?=(?:.*\d){3,})[A-Za-z0-9]{6}$/;
    return regex.test(placa);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const placaLimpia = placa.trim().toUpperCase();

    if (!placaLimpia) {
      setMensaje("Ingrese una placa");
      setTipoMensaje("error");
      return;
    }

    if (!validarPlaca(placaLimpia)) {
      setMensaje("Placa inválida");
      setTipoMensaje("error");
      return;
    }

    try {
      const res = await crearVehiculo(placaLimpia, tipo);

      if (res?.error) {
        setMensaje(res.error);
        setTipoMensaje("error");
        return;
      }

      setPlaca("");
      setMensaje("Vehículo registrado correctamente");
      setTipoMensaje("success");

      recargar();

      //borrar mensaje después de 3 segundos
      setTimeout(() => {
        setMensaje("");
      }, 3000);

    } catch (error) {
      console.log(error);
      setMensaje("Error al registrar vehículo");
      setTipoMensaje("error");
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Registrar vehículo</h3>

      {/* 🔥 MENSAJE DINÁMICO */}
      {mensaje && (
        <div className={`form-alert ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}

      <form onSubmit={manejarSubmit}>

        <div className="form-group">
          <label className="form-label">Placa</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej: ABC123"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.slice(0, 6))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tipo de vehículo</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
          </select>
        </div>

        <button className="form-button" type="submit">
          Registrar ingreso
        </button>

      </form>
    </div>
  );
}

export default FormIngreso;