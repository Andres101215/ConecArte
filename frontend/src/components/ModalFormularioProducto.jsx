// components/ModalFormularioProducto.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalFormularioProducto = ({ show, onHide, onGuardar, producto, modoEdicion, refrescarProductos}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    ubicacion: "",
    id_categoria: ""
  });

  useEffect(() => {
    if (modoEdicion && producto) {
      setFormData({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        cantidad: producto.cantidad || "",
        ubicacion: producto.ubicacion || "",
        id_categoria: producto.id_categoria || ""
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        ubicacion: "",
        id_categoria: ""
      });
    }
  }, [modoEdicion, producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async() => {
    if (!modoEdicion) {
      console.log("Guardando nuevo producto:");
      // Aquí podrías agregar la lógica para editar un product
    onGuardar(formData);
    onHide(); // cerrar modal luego de guardar
    }
    else {
      console.log("Editando producto existente:");
      const id = producto._id
      console.log("ID del producto a editar:", id);
      await fetch("https://conecarte-8olx.onrender.com/productos/productos/"+id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id_artesano: producto.id_artesano,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            cantidad: parseInt(formData.cantidad),
            ubicacion: formData.ubicacion,
            fecha_creacion: new Date(), // O puedes dejar la original si no cambia
            id_categoria: formData.id_categoria
          })
        });
    refrescarProductos(); // Actualizar la lista de productos
    onHide(); // cerrar modal luego de guardar
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modoEdicion ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              name="precio"
              type="number"
              value={formData.precio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              name="cantidad"
              type="number"
              value={formData.cantidad}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFormularioProducto;
