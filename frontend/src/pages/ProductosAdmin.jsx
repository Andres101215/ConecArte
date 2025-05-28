import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import './FormAdmin.css';

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Datos simulados
    setProductos([
      {
        _id: "1",
        id: "p001",
        id_artesano: "art123",
        nombre: "Jarrón artesanal",
        descripcion: "Hecho a mano con barro colombiano",
        precio: 25000,
        cantidad: 10,
        ubicacion: "Medellín",
        fecha_creacion: "2024-03-15",
        id_categoria: "ceramica"
      },
      {
        _id: "2",
        id: "p002",
        id_artesano: "art456",
        nombre: "Cuadro decorativo",
        descripcion: "Pintura en acrílico sobre lienzo",
        precio: 40000,
        cantidad: 5,
        ubicacion: "Bogotá",
        fecha_creacion: "2024-01-22",
        id_categoria: "pintura"
      }
    ]);
  }, []);

  const abrirModal = (producto = null) => {
    if (producto) {
      setProductoSeleccionado({ ...producto });
    } else {
      setProductoSeleccionado({
        _id: Date.now().toString(),
        id: '',
        id_artesano: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        cantidad: 0,
        ubicacion: '',
        fecha_creacion: new Date().toISOString().split('T')[0],
        id_categoria: ''
      });
    }
    setShowModal(true);
  };

  const handleGuardar = () => {
    setProductos((prev) => {
      const existe = prev.find((p) => p._id === productoSeleccionado._id);
      if (existe) {
        return prev.map((p) =>
          p._id === productoSeleccionado._id ? productoSeleccionado : p
        );
      } else {
        return [...prev, productoSeleccionado];
      }
    });
    setShowModal(false);
  };

  const handleEliminar = (_id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      setProductos((prev) => prev.filter((p) => p._id !== _id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "cantidad" ? parseInt(value) : value
    }));
  };

  return (
    <div className="admin-overlay">
      <div className="container admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="admin-title">Gestión de Productos</h2>
          <Button variant="success" onClick={() => abrirModal()}>
            + Agregar Producto
          </Button>
        </div>
        <Table striped bordered hover responsive variant="dark" className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Ubicación</th>
              <th>Fecha Creación</th>
              <th>ID Artesano</th>
              <th>Categoría</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.ubicacion}</td>
                <td>{producto.fecha_creacion}</td>
                <td>{producto.id_artesano}</td>
                <td>{producto.id_categoria}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModal(producto)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminar(producto._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {productoSeleccionado?.nombre ? "Editar Producto" : "Agregar Producto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {productoSeleccionado && (
              <Form>
                <Form.Group>
                  <Form.Label>ID (custom)</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={productoSeleccionado.id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={productoSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={productoSeleccionado.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={productoSeleccionado.precio}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    name="cantidad"
                    value={productoSeleccionado.cantidad}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Control
                    type="text"
                    name="ubicacion"
                    value={productoSeleccionado.ubicacion}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Fecha de Creación</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_creacion"
                    value={productoSeleccionado.fecha_creacion}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>ID Artesano</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_artesano"
                    value={productoSeleccionado.id_artesano}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_categoria"
                    value={productoSeleccionado.id_categoria}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleGuardar}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ProductosAdmin;
