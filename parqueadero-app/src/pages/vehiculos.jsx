import FormIngreso from "../components/FormIngreso";
import ListaVehiculos from "../components/ListaVehiculos";

function Vehiculos({ vehiculos, onAgregar, onSalida }) {
  return (
    <div>
      <h1>Sistema de Parqueadero</h1>

      <FormIngreso onAgregar={onAgregar} />

      <ListaVehiculos
        vehiculos={vehiculos}
        onSalida={onSalida}
      />
    </div>
  );
}

export default Vehiculos;