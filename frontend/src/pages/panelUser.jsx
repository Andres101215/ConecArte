import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./panelUser.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // para ícono de carrito

function PanelUser() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  


  useEffect(() => {
    fetch("https://conecarte-8olx.onrender.com/productos/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="text-center mt-5">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="grid-container">
        {productos.map((producto) => (
          <Link to={`/producto/${producto._id}`} key={producto._id} className="card-link">
            <div className="card">
              <img src={producto.imagen} alt={producto.nombre} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text precio-rojo">{"$" + producto.precio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Botón flotante de carrito que navega a /carrito */}
      <button className="btn btn-primary carrito-flotante" onClick={() => navigate("/pasarela")}>
        <FaShoppingCart size={24} />
      </button>
    </div>
  );
}

export default PanelUser;
