import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import './FormAdmin.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([
    {
      _id: '1',
      nombre: 'Andrés',
      apellido: 'Admin',
      correo: 'andres@admin.com',
      username: 'admin_andres',
      tipo_usuario: 'admin',
      contraseña: '',
      fecha_nacimiento: '',
      departamento: '',
      ciudad: '',
      direccion: '',
      genero: '',
      tipo_documento: '',
      documento: '',
      celular: '',
      fecha_creacion: new Date().toISOString().split('T')[0],
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditado({ ...usuario });
    setShowEditModal(true);
  };

  const abrirModalNuevo = () => {
    setUsuarioEditado({
      _id: Date.now().toString(),
      nombre: '',
      apellido: '',
      correo: '',
      contraseña: '',
      tipo_usuario: 'usuario',
      username: '',
      fecha_nacimiento: '',
      departamento: '',
      ciudad: '',
      direccion: '',
      genero: '',
      tipo_documento: '',
      documento: '',
      celular: '',
      fecha_creacion: new Date().toISOString().split('T')[0],
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setUsuarioEditado({
      ...usuarioEditado,
      [e.target.name]: e.target.value,
    });
  };

  const guardarCambios = () => {
    setUsuarios((prev) => {
      const existe = prev.find((u) => u._id === usuarioEditado._id);
      if (existe) {
        return prev.map((u) => (u._id === usuarioEditado._id ? usuarioEditado : u));
      } else {
        return [...prev, usuarioEditado];
      }
    });
    setShowEditModal(false);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    }
  };

  return (
    <div className="admin-overlay">
      <div className="container admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="admin-title">Gestión de Usuarios</h2>
          <Button variant="success" onClick={abrirModalNuevo}>+ Agregar Usuario</Button>
        </div>

        <Table className="admin-table" striped bordered hover variant="dark" responsive>
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
                  <Button size="sm" variant="warning" className="me-2" onClick={() => abrirModalEdicion(u)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => eliminarUsuario(u._id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{usuarioEditado?.nombre ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              ['nombre', 'Nombre'],
              ['apellido', 'Apellido'],
              ['correo', 'Correo'],
              ['contraseña', 'Contraseña'],
              ['username', 'Username'],
              ['fecha_nacimiento', 'Fecha de Nacimiento', 'date'],
              ['departamento', 'Departamento'],
              ['ciudad', 'Ciudad'],
              ['direccion', 'Dirección'],
              ['genero', 'Género'],
              ['tipo_documento', 'Tipo de Documento'],
              ['documento', 'Número de Documento'],
              ['celular', 'Celular'],
              ['fecha_creacion', 'Fecha de Creación', 'date'],
            ].map(([name, label, type = 'text']) => (
              <Form.Group key={name} className="mb-2">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  name={name}
                  value={usuarioEditado?.[name] || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-2">
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Control
                as="select"
                name="tipo_usuario"
                value={usuarioEditado?.tipo_usuario}
                onChange={handleChange}
              >
                <option value="usuario">Usuario</option>
                <option value="vendedor">Vendedor</option>
                <option value="admin">Administrador</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={guardarCambios}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      {/* Botón flotante de inicio */}
      <Link to="/panelAdmin" className="btn-home-float" title="Volver al inicio">
        <FaHome size={24} />
      </Link>
    </div>
  );
}

export default UsuariosAdmin;
