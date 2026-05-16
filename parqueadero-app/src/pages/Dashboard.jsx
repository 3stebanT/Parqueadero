import { useEffect, useState } from "react";
import { obtenerVehiculos, obtenerHistorial } from "../services/api";
import "../components/styles/Dashboard.css";

function Dashboard() {
  const [vehiculos, setVehiculos] = useState([]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const v = await obtenerVehiculos();
    const h = await obtenerHistorial();

    setVehiculos(v);
    setHistorial(h);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-grid">
        <Card title="Vehículos dentro" value={vehiculos.length} />
        <Card title="Historial" value={historial.length} />
        <Card title="Ganancias" value={`$${calcularGanancia(historial)}`} />
      </div>
    </div>
  );
}

const calcularGanancia = (historial) => {
  return historial.reduce((t, v) => t + (v.valor || 0), 0);
};

function Card({ title, value }) {
  return (
    <div className="dashboard-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;