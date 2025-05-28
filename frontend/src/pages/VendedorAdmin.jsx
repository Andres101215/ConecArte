import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

function VendedorAdmin() {
  const [vendedores, setVendedores] = useState([]);
  const [vendedorEditando, setVendedorEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://conecarte-8olx.onrender.com/vendedores')
      .then((res) => res.json())
      .then((data) => setVendedores(data))
      .catch((err) => console.error('Error al cargar vendedores:', err));
  }, []);

  const handleEditClick = (vendedor) => {
    setVendedorEditando({ ...vendedor });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendedorEditando((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    fetch(`https://conecarte-8olx.onrender.com/vendedores/${vendedorEditando._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendedorEditando),
    })
      .then((res) => res.json())
      .then((data) => {
        setVendedores((prev) =>
          prev.map((v) => (v._id === data._id ? data : v))
        );
        setShowModal(false);
      })
      .catch((err) => console.error('Error al guardar cambios:', err));
  };

  return (
    <div className="admin-overlay">
      <div className="container p-4 bg-dark rounded text-white">
        <h2 className="mb-4 text-warning">Gestión de Vendedores</h2>
        <Table striped bordered hover variant="dark" responsive>
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
                <td>{v.categorias?.join(', ')}</td>
                <td>{v.redes_sociales?.join(', ')}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEditClick(v)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre_tienda">
              <Form.Label>Nombre Tienda</Form.Label>
              <Form.Control
                name="nombre_tienda"
                value={vendedorEditando?.nombre_tienda || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="descripcion_tienda" className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion_tienda"
                value={vendedorEditando?.descripcion_tienda || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="categorias" className="mt-2">
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
            <Form.Group controlId="redes_sociales" className="mt-2">
              <Form.Label>Redes Sociales (URLs separadas por coma)</Form.Label>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendedorAdmin;
