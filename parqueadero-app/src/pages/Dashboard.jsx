import { useEffect, useState } from "react";
import { obtenerVehiculos, obtenerHistorial } from "../services/api";
import "../components/styles/Dashboard.css";
import { agruparGananciasPorMes } from "../utils/calcularGanancia";
import Loader from "../components/Loader";

function Dashboard() {
  const [vehiculos, setVehiculos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {

      setLoading(true);

      const v = await obtenerVehiculos();
      const h = await obtenerHistorial();

      setVehiculos(v);
      setHistorial(h);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loader />;
  }

  const gananciasPorMes = agruparGananciasPorMes(historial);

  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-grid">
        <Card title="Vehículos dentro" value={vehiculos.length} />
        <Card title="Historial" value={historial.length} />
      </div>

      <h2 className="dashboard-title" style={{ marginTop: "30px" }}>
        Ganancias por mes
      </h2>

      <div className="dashboard-grid">
        {gananciasPorMes.map((g, i) => (
          <Card
            key={i}
            title={`${nombresMeses[g.mes]} ${g.año}`}
            value={`$${g.total}`}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="dashboard-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;