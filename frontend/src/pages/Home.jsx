import React from 'react';
import './Home.css'; // Asegúrate de que este archivo exista

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="container text-center py-5">
          <h1 className="alert alert-warning fw-bold">
            PARA PROBAR LA APLICACIÓN: Desplieguen los servicios de <strong>AUTH SERVICE</strong>, <strong>PRODUCT SERVICE</strong>, <strong>CART SERVICE</strong>. Para registrar usuario es necesario tener el carrito activo.
          </h1>

          <h1 className="display-4 fw-bold bandera-texto">
          <span className="text-yellow">Bienvenido</span>{' '}
          <span className="text-blue">a</span>{' '}
          <span className="text-red">ConectArte</span>
          </h1>

          <p className="lead white-shadow-text">
            Conecta artesanos y compradores en un solo lugar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
