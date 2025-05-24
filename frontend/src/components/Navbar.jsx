import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import './Navbar.css'; // Estilos personalizados

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">ConectArte</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register-user">Registro Usuario</Link>
                </li>
              </>
            )}

            {user?.tipo_usuario === "vendedor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/register-seller">Registrar Tienda</Link>
              </li>
            )}

            {user?.tipo_usuario === "usuario" && (
              <li className="nav-item">
                <Link className="nav-link" to="/pasarela">Carrito</Link>
              </li>
            )}

            {user?.tipo_usuario === "usuario" && (
              <li className="nav-item">
                <Link className="nav-link" to="/panelUser">Ver Productos</Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <button className="btn btn-outline-warning ms-3" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
