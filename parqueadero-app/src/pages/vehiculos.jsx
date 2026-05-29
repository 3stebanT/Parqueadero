import FormIngreso from "../components/FormIngreso";
import ListaVehiculos from "../components/ListaVehiculos";
import Loader from "../components/Loader";

function Vehiculos({ vehiculos, onAgregar, onSalida, loading }) {

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Sistema de Parqueadero</h1>

      <FormIngreso recargar={onAgregar} />

      <ListaVehiculos
        vehiculos={vehiculos}
        onSalida={onSalida}
      />
    </div>
  );
}

export default Vehiculos;