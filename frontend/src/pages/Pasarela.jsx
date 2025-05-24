import React, { useEffect, useState } from "react";
import WompiPago from "../components/WompiPago";
import "../ProductosGrid.css";

function CarritoUsuario() {
  const [carrito, setCarrito] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const id_usuario = localStorage.getItem("id_usuario");


  const eliminarProducto = async (id_producto) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto del carrito?");
    if (!confirmar) return;

    try {
      const response = await fetch(`https://conecarte-8olx.onrender.com/carritos/${id_usuario}/${id_producto}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
      }

      // Vuelve a consultar el carrito completo
      const res = await fetch(`https://conecarte-8olx.onrender.com/carritos/usuario/${id_usuario}`);
      if (!res.ok) throw new Error("No se pudo obtener el carrito actualizado");

      // Recargar el carrito actualizado
      const data = await res.json();
      setCarrito(data);
    } catch (err) {
      setError(err.message);
    }
  };


  useEffect(() => {
    if (!id_usuario) {
      setError("Usuario no autenticado");
      setCargando(false);
      return;
    }

    fetch(`https://conecarte-8olx.onrender.com/carritos/usuario/${id_usuario}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el carrito");
        }
        return res.json();
      })
      .then((data) => {
        setCarrito(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [id_usuario]);

  if (cargando) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!carrito) return <p>No hay carrito disponible.</p>;

  return (
    <div>
      <h2>Carrito de Compras</h2>

      <div className="grid-container">
      {Array.isArray(carrito.productosCom) && Array.isArray(carrito.productos) && carrito.productosCom.map((producto, index) => (
          <div className="card">
            <button className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={() => eliminarProducto(producto._id)}>
              x
            </button>
            <img src={producto.imagen} /> <br />
            Producto : {producto.nombre} <br />
            Descripcion : {producto.descripcion} <br />
            Cantidad: {carrito.productos[index].cantidad} <br />
            Precio : {producto.precio} <br />
          </div>
        ))}
      </div>

      <h3>Total: ${carrito.total}</h3>

      <WompiPago pasarelaDePago={{ total: carrito.total }} />
    </div>
  );
}

export default CarritoUsuario;
