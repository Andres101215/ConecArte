import React, { useEffect, useState } from "react";
import "../ProductosGrid.css";
import { Link } from "react-router-dom"; 

function PanelUser() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/productos")
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

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid-container">
      {productos.map((producto) => (
        <Link to={`/producto/${producto._id}`} key={producto._id} className="card-link">
          <div className="card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <h3 className="precio-rojo">{"$" + producto.precio}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PanelUser;
