import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/login">Iniciar Sesión</Link> |{" "}
      <Link to="/register-user">Registro Usuario</Link> |{" "}
      <Link to="/register-seller">Registrar Tienda</Link>
    </nav>
  );
}

export default Navbar;
