import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Datos simulados
    setProductos([
      {
        _id: "1",
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

  const handleEditar = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleGuardar = () => {
    setProductos((prev) =>
      prev.map((p) =>
        p._id === productoSeleccionado._id ? productoSeleccionado : p
      )
    );
    setShowModal(false);
  };

  return (
    <div className="admin-overlay">
      <Container className="text-white">
        <h2 className="mb-4 text-warning text-center">Gestión de Productos</h2>
        <Table striped bordered hover responsive className="table-dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Ubicación</th>
              <th>Creación</th>
              <th>Artesano ID</th>
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
                  <Button variant="warning" size="sm" onClick={() => handleEditar(producto)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal de edición */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {productoSeleccionado && (
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoSeleccionado.nombre}
                    onChange={(e) =>
                      setProductoSeleccionado({
                        ...productoSeleccionado,
                        nombre: e.target.value
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoSeleccionado.descripcion}
                    onChange={(e) =>
                      setProductoSeleccionado({
                        ...productoSeleccionado,
                        descripcion: e.target.value
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoSeleccionado.precio}
                    onChange={(e) =>
                      setProductoSeleccionado({
                        ...productoSeleccionado,
                        precio: parseInt(e.target.value)
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoSeleccionado.cantidad}
                    onChange={(e) =>
                      setProductoSeleccionado({
                        ...productoSeleccionado,
                        cantidad: parseInt(e.target.value)
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoSeleccionado.ubicacion}
                    onChange={(e) =>
                      setProductoSeleccionado({
                        ...productoSeleccionado,
                        ubicacion: e.target.value
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    value={productoSeleccionado.id_categoria}
                    onChange={(e) =>
                      setProductoSeleccionado({
                        ...productoSeleccionado,
                        id_categoria: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardar}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default ProductosAdmin;
