import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="container text-center home-text-container">
        <h1 className="display-1 fw-bold bandera-texto">
          <span className="text-yellow">Bienvenido</span>{' '}
          <span className="text-blue">a</span>{' '}
          <span className="text-red">ConectArte</span>
        </h1>

        <h3 className="lead white-shadow-text">
          Conecta artesanos y compradores en un solo lugar.
        </h3>
      </div>
    </div>
  );
}

export default Home;
