import "./styles/Factura.css";

function Factura({ factura }) {
  if (!factura) return null;

  return (
    <div className="factura-wrapper">
      <div className="factura-container">

        <h4 className="factura-title">FACTURA DE PARQUEADERO</h4>

        <hr className="factura-divider" />

        <p className="factura-text"><b>Placa:</b> {factura.placa}</p>
        <p className="factura-text"><b>Tipo:</b> {factura.tipo}</p>

        <p className="factura-text">
          <b>Entrada:</b> {factura.horaEntrada.toLocaleString()}
        </p>
        <p className="factura-text">
          <b>Salida:</b> {factura.horaSalida.toLocaleString()}
        </p>

        <hr className="factura-divider" />

        <p className="factura-text"><b>Minutos:</b> {factura.minutos}</p>
        <p className="factura-text"><b>Base:</b> ${factura.base}</p>
        <p className="factura-text"><b>Valor/min:</b> ${factura.valorMinuto}</p>

        <div className="factura-total">
          TOTAL: ${factura.total}
        </div>

      </div>
    </div>
  );
}

export default Factura;