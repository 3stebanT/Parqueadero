import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      
      {/* PARTE SUPERIOR */}
      <div>
        <h4 className="sidebar-title">ZonaPark</h4>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link">
              Dashboard
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/vehiculos" className="sidebar-link">
              Vehículos
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/historial" className="sidebar-link">
              Historial
            </Link>
          </li>
        </ul>
      </div>

      {/* PARTE INFERIOR */}
      <div>
        <span
          onClick={handleLogout}
          className="sidebar-logout"
        >
          Cerrar sesión
        </span>
      </div>
    </div>
  );
}

export default Sidebar;