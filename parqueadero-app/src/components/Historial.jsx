import { useEffect, useState } from "react";
import { obtenerHistorial } from "../services/api";
import "./styles/Historial.css";

function Historial() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    const data = await obtenerHistorial();
    setHistorial(data);
  };

  return (
    <div className="historial-container">
      <h2 className="historial-title">Historial de Vehículos</h2>

      {historial.length === 0 ? (
        <p className="historial-empty">No hay registros</p>
      ) : (
        <div className="historial-table-container">
          <table className="historial-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((v) => (
                <tr key={v.id}>
                  <td>{v.placa}</td>
                  <td>{new Date(v.hora_entrada).toLocaleString()}</td>
                  <td>{new Date(v.hora_salida).toLocaleString()}</td>
                  <td>${v.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Historial;