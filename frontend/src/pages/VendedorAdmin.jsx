import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import './FormAdmin.css';

function VendedorAdmin() {
  const [vendedores, setVendedores] = useState([
    {
      _id: '1',
      nombre_tienda: 'Artesanías Luz',
      descripcion_tienda: 'Hecho a mano con amor',
      categorias: ['textil', 'decoración'],
      experiencia: 5,
      redes_sociales: ['@artesluz'],
      productos: 'macrame, bolsos, tapices',
      fecha_registro: '2022-03-15',
      id_usuario: 'user123',
    },
    {
      _id: '2',
      nombre_tienda: 'Galería de Madera',
      descripcion_tienda: 'Arte en madera reciclada',
      categorias: ['escultura', 'hogar'],
      experiencia: 8,
      redes_sociales: ['@galeriamadera'],
      productos: 'cuadros, mesas, esculturas',
      fecha_registro: '2023-01-10',
      id_usuario: 'user456',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [vendedorEditando, setVendedorEditando] = useState(null);

  const abrirModalNuevo = () => {
    setVendedorEditando({
      _id: Date.now().toString(),
      nombre_tienda: '',
      descripcion_tienda: '',
      categorias: [],
      experiencia: 0,
      redes_sociales: [],
      productos: '',
      fecha_registro: new Date().toISOString().split('T')[0],
      id_usuario: '',
    });
    setShowModal(true);
  };

  const abrirModalEdicion = (vendedor) => {
    setVendedorEditando({ ...vendedor });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendedorEditando((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    setVendedores((prev) => {
      const existe = prev.find((v) => v._id === vendedorEditando._id);
      if (existe) {
        return prev.map((v) =>
          v._id === vendedorEditando._id ? vendedorEditando : v
        );
      } else {
        return [...prev, vendedorEditando];
      }
    });
    setShowModal(false);
  };

  const eliminarVendedor = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este vendedor?')) {
      setVendedores((prev) => prev.filter((v) => v._id !== id));
    }
  };

  return (
    <div className="admin-overlay">
      <div className="container admin-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="admin-title">Gestión de Vendedores</h2>
          <Button variant="success" onClick={abrirModalNuevo}>
            + Agregar Vendedor
          </Button>
        </div>

        <Table className="admin-table" striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Nombre Tienda</th>
              <th>Descripción</th>
              <th>Categorías</th>
              <th>Redes Sociales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vendedores.map((v) => (
              <tr key={v._id}>
                <td>{v.nombre_tienda}</td>
                <td>{v.descripcion_tienda}</td>
                <td>{v.categorias.join(', ')}</td>
                <td>{v.redes_sociales.join(', ')}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => abrirModalEdicion(v)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => eliminarVendedor(v._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {vendedorEditando?.nombre_tienda ? 'Editar Vendedor' : 'Agregar Vendedor'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre Tienda</Form.Label>
              <Form.Control
                name="nombre_tienda"
                value={vendedorEditando?.nombre_tienda || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion_tienda"
                value={vendedorEditando?.descripcion_tienda || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Categorías (separadas por coma)</Form.Label>
              <Form.Control
                name="categorias"
                value={vendedorEditando?.categorias?.join(', ') || ''}
                onChange={(e) =>
                  setVendedorEditando((prev) => ({
                    ...prev,
                    categorias: e.target.value.split(',').map((c) => c.trim()),
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Experiencia (años)</Form.Label>
              <Form.Control
                type="number"
                name="experiencia"
                value={vendedorEditando?.experiencia || 0}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Redes Sociales (separadas por coma)</Form.Label>
              <Form.Control
                name="redes_sociales"
                value={vendedorEditando?.redes_sociales?.join(', ') || ''}
                onChange={(e) =>
                  setVendedorEditando((prev) => ({
                    ...prev,
                    redes_sociales: e.target.value.split(',').map((r) => r.trim()),
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Productos</Form.Label>
              <Form.Control
                name="productos"
                value={vendedorEditando?.productos || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Registro</Form.Label>
              <Form.Control
                type="date"
                name="fecha_registro"
                value={vendedorEditando?.fecha_registro || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID Usuario</Form.Label>
              <Form.Control
                name="id_usuario"
                value={vendedorEditando?.id_usuario || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambios}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendedorAdmin;
