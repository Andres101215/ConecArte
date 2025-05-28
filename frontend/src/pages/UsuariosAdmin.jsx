import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  useEffect(() => {
    fetch("https://conecarte-8olx.onrender.com/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error(err));
  }, []);

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditado(usuario);
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setUsuarioEditado({
      ...usuarioEditado,
      [e.target.name]: e.target.value,
    });
  };

  const guardarCambios = () => {
    fetch(`https://conecarte-8olx.onrender.com/usuarios/${usuarioEditado._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioEditado),
    })
      .then(res => res.json())
      .then(() => {
        setUsuarios(prev =>
          prev.map(u => (u._id === usuarioEditado._id ? usuarioEditado : u))
        );
        setShowEditModal(false);
      });
  };

  return (
    <div className="usuarios-admin-container">
      <div className="overlay-usuarios">
        <div className="container p-4 bg-dark text-white rounded shadow-lg">
          <h2 className="mb-4">Gestión de Usuarios</h2>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Username</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id}>
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.username}</td>
                  <td>{u.tipo_usuario}</td>
                  <td>
                    <Button variant="warning" onClick={() => abrirModalEdicion(u)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioEditado && (
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={usuarioEditado.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={usuarioEditado.apellido}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={usuarioEditado.correo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Control
                  as="select"
                  name="tipo_usuario"
                  value={usuarioEditado.tipo_usuario}
                  onChange={handleChange}
                >
                  <option value="usuario">Usuario</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UsuariosAdmin;
