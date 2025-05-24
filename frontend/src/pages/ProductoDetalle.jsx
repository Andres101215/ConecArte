import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductoDetalle() {
  const { id } = useParams(); // ID del producto
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const id_usuario = localStorage.getItem("id_usuario"); // Asegúrate de que esté guardado

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

  if (!producto) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p>Ubicación: {producto.ubicacion}</p>
      <p>Disponibles: {producto.cantidad} unidades</p>

      <label>
        Cantidad:
        <input
          type="number"
          min="1"
          max={producto.cantidad}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          style={{ marginLeft: "10px", width: "60px" }}
        />
      </label>

      <br /><br />
      
      <h3>Precio: ${producto.precio}</h3>

      <button className="btn btn-primary" onClick={añadirAlCarrito}>
        Añadir al Carrito
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
