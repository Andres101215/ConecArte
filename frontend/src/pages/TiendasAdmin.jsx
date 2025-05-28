import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table, Container } from "react-bootstrap";

function TiendasAdmin() {
  const [tiendas, setTiendas] = useState([]);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulación de datos
    setTiendas([
      {
        _id: "1",
        nombre_tienda: "ArteZen",
        descripcion_tienda: "Tienda de artesanía oriental",
        categorias: ["Cerámica", "Pintura"],
        experiencia: 5,
        redes_sociales: ["@artezen_ig"],
        productos: "15",
        fecha_registro: "2024-03-10",
        id_usuario: "user123"
      },
      {
        _id: "2",
        nombre_tienda: "Manos de Barro",
        descripcion_tienda: "Cerámica artesanal",
        categorias: ["Cerámica"],
        experiencia: 8,
        redes_sociales: ["@barro_art"],
        productos: "23",
        fecha_registro: "2023-11-05",
        id_usuario: "user456"
      }
    ]);
  }, []);

  const handleEditar = (tienda) => {
    setTiendaSeleccionada(tienda);
    setShowModal(true);
  };

  const handleGuardar = () => {
    setTiendas((prevTiendas) =>
      prevTiendas.map((t) =>
        t._id === tiendaSeleccionada._id ? tiendaSeleccionada : t
      )
    );
    setShowModal(false);
  };

  return (
    <div className="admin-overlay">
      <Container className="text-white">
        <h2 className="mb-4 text-warning text-center">Gestión de Tiendas</h2>
        <Table striped bordered hover responsive className="table-dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categorías</th>
              <th>Experiencia</th>
              <th>Redes</th>
              <th>Productos</th>
              <th>Fecha Registro</th>
              <th>Usuario ID</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tiendas.map((tienda) => (
              <tr key={tienda._id}>
                <td>{tienda.nombre_tienda}</td>
                <td>{tienda.descripcion_tienda}</td>
                <td>{tienda.categorias.join(", ")}</td>
                <td>{tienda.experiencia}</td>
                <td>{tienda.redes_sociales.join(", ")}</td>
                <td>{tienda.productos}</td>
                <td>{tienda.fecha_registro}</td>
                <td>{tienda.id_usuario}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditar(tienda)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para editar tienda */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Tienda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tiendaSeleccionada && (
              <Form>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={tiendaSeleccionada.nombre_tienda}
                    onChange={(e) =>
                      setTiendaSeleccionada({
                        ...tiendaSeleccionada,
                        nombre_tienda: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    value={tiendaSeleccionada.descripcion_tienda}
                    onChange={(e) =>
                      setTiendaSeleccionada({
                        ...tiendaSeleccionada,
                        descripcion_tienda: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Categorías (separadas por coma)</Form.Label>
                  <Form.Control
                    type="text"
                    value={tiendaSeleccionada.categorias.join(", ")}
                    onChange={(e) =>
                      setTiendaSeleccionada({
                        ...tiendaSeleccionada,
                        categorias: e.target.value.split(",").map(c => c.trim()),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Redes Sociales (coma)</Form.Label>
                  <Form.Control
                    type="text"
                    value={tiendaSeleccionada.redes_sociales.join(", ")}
                    onChange={(e) =>
                      setTiendaSeleccionada({
                        ...tiendaSeleccionada,
                        redes_sociales: e.target.value.split(",").map(r => r.trim()),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Experiencia</Form.Label>
                  <Form.Control
                    type="number"
                    value={tiendaSeleccionada.experiencia}
                    onChange={(e) =>
                      setTiendaSeleccionada({
                        ...tiendaSeleccionada,
                        experiencia: parseInt(e.target.value),
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

export default TiendasAdmin;
