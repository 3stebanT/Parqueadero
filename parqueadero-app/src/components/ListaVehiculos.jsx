import "./styles/ListaVehiculos.css";

function ListaVehiculos({ vehiculos, onSalida }) {
  return (
    <div className="lista-container">

      <h3 className="lista-title">Vehículos dentro</h3>

      {vehiculos.length === 0 ? (
        <p className="lista-empty">No hay vehículos</p>
      ) : (
        <div className="lista-table-container">

          <table className="lista-table">
            
            <thead>
              <tr>
                <th>Placa</th>
                <th>Hora entrada</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {vehiculos.map((v) => (
                <tr key={v.id}>
                  <td className="lista-placa">{v.placa}</td>

                  <td>
                    {new Date(v.hora_entrada).toLocaleTimeString()}
                  </td>

                  <td>
                    <button
                      className="lista-button"
                      onClick={() => onSalida(v.id)}
                    >
                      Registrar salida
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default ListaVehiculos;