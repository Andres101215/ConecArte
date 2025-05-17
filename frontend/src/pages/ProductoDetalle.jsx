import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/productos/${id}`) 
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <h3>Precio: ${producto.precio}</h3>
      <p>Ubicación: {producto.ubicacion}</p>
      <p>Stock: {producto.cantidad}</p>
      <button type="submit" className="btn btn-primary">Añadir al Carrito</button>
    </div>
  );
}
