import React from 'react';
import './Home.css'; // Asegúrate de que este archivo exista

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="container text-center py-5">
          <h1 className="alert alert-warning fw-bold">
          la primera vez se demora si el servicio no esta activo ,en caso de que no cargue avisan para reiniciar el servidor
          </h1>

          <h1 className="display-1 fw-bold bandera-texto">
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
