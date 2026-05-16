import { Link } from "react-router-dom";
import "../../components/styles/SidebarInicio.css";

function SidebarInicio() {
  return (
    <div className="sidebar">
      
      {/* PARTE SUPERIOR */}
      <div>
        <h4 className="sidebar-title">ZonaPark</h4>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              Ingresar Vehículo
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/salida" className="sidebar-link">
              Sacar Vehículo
            </Link>
          </li>
        </ul>
      </div>

      {/* PARTE INFERIOR */}
      <div>
        <Link to="/login" className="sidebar-logout">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}

export default SidebarInicio;