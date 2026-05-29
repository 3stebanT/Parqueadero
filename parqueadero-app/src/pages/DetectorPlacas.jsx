import { useDetector } from "../components/Detector";
import "../components/styles/DetectorPlacas.css";

function DetectorPlacas() {
  const {
    preview,
    placa,
    tipo,
    mensaje,
    loading, // 🔥 AQUÍ VIENE
    setTipo,
    manejarImagen,
    detectar,
    registrarVehiculo,
  } = useDetector();

  return (
    <div className="placas-container">

      <h1 className="placas-title">
        Detector Inteligente de Placas
      </h1>

      <div className="placas-grid">

        {/* IZQUIERDA */}
        <div className="placas-card">

          <div className="form-group">
            <label className="form-label">Seleccionar imagen</label>

            <input
              type="file"
              accept="image/*"
              onChange={manejarImagen}
              className="form-file"
            />
          </div>

          {preview && (
            <img src={preview} className="preview-img" />
          )}

          <div className="placas-select-wrapper">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="placas-select"
            >
              <option value="carro"> Carro</option>
              <option value="moto"> Moto</option>
            </select>
          </div>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button onClick={detectar} className="btn btn-yellow">
              Detectar
            </button>

            <button onClick={registrarVehiculo} className="btn btn-green">
              Registrar
            </button>
          </div>

        </div>

        {/* DERECHA */}
        <div className="placas-card">

          <div className={`resultado-container ${loading ? "scanning" : ""}`}>

            {loading && (
              <div className="scanner-line"></div>
            )}

            {placa ? (
              <div className="resultado-card ok">
                <span className="resultado-label">Placa detectada</span>
                <h1 className="resultado-placa">{placa}</h1>
              </div>
            ) : (
              <div className="resultado-card empty">
                <span className="resultado-label">Resultado</span>
                <p>No hay placa detectada</p>
              </div>
            )}

            {mensaje && (
              <div className="resultado-mensaje">
                {mensaje}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default DetectorPlacas;