import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { PencilFill, TrashFill, Plus } from "react-bootstrap-icons";
import ModalFormularioProducto from "./ModalFormularioProducto";

const ModalProductos = ({ show, onHide, productos, nombreTienda }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleAbrirFormulario = (producto = null) => {
    setModoEdicion(!!producto);
    setProductoSeleccionado(producto);
    setShowFormModal(true);
  };

  const handleGuardarProducto = (nuevoProducto) => {
    console.log("Producto guardado:", nuevoProducto);
    // Aquí podrías hacer un fetch o actualizar el estado del padre con setProductos
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Productos de {nombreTienda}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover responsive className="text-center align-middle">
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={producto.id}>
                  <td>{index + 1}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio.toFixed(2)}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.ubicacion}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleAbrirFormulario(producto)}
                    >
                      <PencilFill />
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      <TrashFill />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Button
          variant="primary"
          className="rounded-circle position-absolute"
          style={{
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            padding: '0',
          }}
          onClick={() => handleAbrirFormulario()}
        >
          <Plus size={24} />
        </Button>
      </Modal>

      <ModalFormularioProducto
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onGuardar={handleGuardarProducto}
        producto={productoSeleccionado}
        modoEdicion={modoEdicion}
      />
    </>
  );
};

export default ModalProductos;
