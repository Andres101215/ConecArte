import React from 'react';
import './PanelAdmin.css';
import fondo from '../assets/pendiente5.webp';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PanelAdmin() {
  return (
    <div className="admin-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="container bg-dark bg-opacity-75 p-5 rounded text-white">
          <h1 className="text-center mb-4">Bienvenido, Administrador</h1>
          <p className="text-center mb-5">Administra el sistema desde este panel</p>

          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <Link to="/admin/usuarios">
                <Button variant="primary" className="w-100">Usuarios</Button>
              </Link>
            </div>
            <div className="col-md-3 mb-4">
              <Link to="/admin/vendedores">
                <Button variant="warning" className="w-100 text-dark">Vendedores</Button>
              </Link>
            </div>
            <div className="col-md-3 mb-4">
              <Link to="/admin/productos">
                <Button variant="success" className="w-100">Productos</Button>
              </Link>
            </div>
            <div className="col-md-3 mb-4">
              <Link to="/admin/tiendas">
                <Button variant="info" className="w-100 text-dark">Tiendas</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAdmin;
