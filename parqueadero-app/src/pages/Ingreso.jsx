import FormIngreso from "../components/FormIngreso";
import { useState, useEffect } from "react";
import { obtenerVehiculos } from "../services/api";

function Ingreso() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    const data = await obtenerVehiculos();
    setVehiculos(data);
  };

  return (
    <div>
      <h2>Ingresar Vehículo</h2>

      <FormIngreso recargar={cargarVehiculos} />
    </div>
  );
}

export default Ingreso;