import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './ProductoDetalle.css';

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    fetch(`https://conecarte-8olx.onrender.com/productos/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, [id]);

  const añadirAlCarrito = async () => {
    if (!id_usuario) {
      setMensaje("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }

    try {
      const res = await fetch("https://conecarte-8olx.onrender.com/carritos/carritos/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_usuario,
          id_producto: id,
          cantidad: parseInt(cantidad)
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Producto añadido al carrito");
      } else {
        setMensaje(data.mensaje || "Error al añadir al carrito");
      }

    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      setMensaje("Error de red");
    }
  };

  if (!producto) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="container producto-detalle-container">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">{producto.nombre}</h2>
          <p className="card-text">{producto.descripcion}</p>
          <p><strong>Ubicación:</strong> {producto.ubicacion}</p>
          <p><strong>Disponibles:</strong> {producto.cantidad} unidades</p>

          <div className="mb-3">
            <label className="form-label"><strong>Cantidad:</strong></label>
            <input
              type="number"
              min="1"
              max={producto.cantidad}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="form-control cantidad-input"
              style={{ maxWidth: "100px" }}
            />
          </div>

          <h4 className="text-success"><strong>Precio:</strong> ${producto.precio}</h4>

          <button className="btn btn-primary mt-3" onClick={añadirAlCarrito}>
            Añadir al Carrito
          </button>

          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>

      {/* Botón flotante de perfil */}
      <button
        className="btn btn-secondary perfil-float-button"
        onClick={() => navigate("/perfil")}
        title="Ir al perfil"
      >
        <FaUserCircle size={24} />
      </button>
    </div>
  );
}
