import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalFormularioProducto = ({ show, onHide, onGuardar, producto, modoEdicion, idTienda }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [validated, setValidated] = useState(false);

  const id_artesano = localStorage.getItem("id_usuario");

  useEffect(() => {
    if (modoEdicion && producto) {
      setNombre(producto.nombre || "");
      setDescripcion(producto.descripcion || "");
      setPrecio(producto.precio || "");
      setCantidad(producto.cantidad || "");
      setUbicacion(producto.ubicacion || "");
      setIdCategoria(producto.id_categoria || "");
    } else {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setCantidad("");
      setUbicacion("");
      setIdCategoria("");
    }
  }, [producto, modoEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (e.currentTarget.checkValidity() === false) return;

    const nuevoProducto = {
      id_artesano,
      nombre,
      descripcion,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
      ubicacion,
      fecha_creacion: new Date().toISOString(),
      id_categoria: idCategoria
    };

    try {
      const url = modoEdicion
        ? `https://conecarte-8olx.onrender.com/vendedores/vendedores/productos/${producto._id}`
        : `https://conecarte-8olx.onrender.com/productos/productos/`;

      const method = modoEdicion ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      const data = await response.json();
      onGuardar(data);
      onHide();
      if (!modoEdicion && idTienda && data._id) {
        await fetch(`https://conecarte-8olx.onrender.com/vendedores/vendedores/agregar-producto/${idTienda}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id_producto: data._id })
        });
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Hubo un error al guardar el producto.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modoEdicion ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">Nombre requerido</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">Descripción requerida</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min={0}
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">Precio válido requerido</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              min={0}
            />
            <Form.Control.Feedback type="invalid">Cantidad válida requerida</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">Ubicación requerida</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="ID de la categoría"
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">ID de categoría requerido</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            {modoEdicion ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalFormularioProducto;
