import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import './Perfil.css';
import { FaUserCircle } from 'react-icons/fa';
import ModalBuzon from '../components/ModalBuzon';
import 'bootstrap/dist/css/bootstrap.min.css';

function Perfil() {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  const conversaciones = [
    {
      user: 'usuario123',
      mensajes: [
        { emisor: true, texto: 'Hola, ¿cómo estás?' },
        { emisor: false, texto: 'Bien, gracias. ¿Y tú?' },
        { emisor: true, texto: 'Muy bien, gracias.' }
      ]
    },
    {
      user: 'artesano_jose',
      mensajes: [
        { emisor: false, texto: '¿Tienes mochilas disponibles?' },
        { emisor: true, texto: 'Sí, claro. ¿Qué modelo te gusta?' }
      ]
    }
  ];

  if (!user) {
    return (
      <div className="overlay">
        <h3 className="text-white">No has iniciado sesión.</h3>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="overlay" style={{ paddingTop: '110px' }}>
        <div className="card perfil-card shadow-lg mx-auto">
          <div className="card-body text-center">
            <FaUserCircle size={100} className="text-secondary mb-4" />
            <h4 className="text-white">Perfil de Usuario</h4>
            <hr className="bg-light" />

            <div className="row text-white text-start mt-4 px-3">
              <div className="col-md-6 mb-3">
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Apellido:</strong> {user.apellido}</p>
                <p><strong>Correo:</strong> {user.correo}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Tipo de Usuario:</strong> {user.tipo_usuario}</p>
                <p><strong>Fecha de Nacimiento:</strong> {user.fecha_nacimiento}</p>
              </div>
              <div className="col-md-6 mb-3">
                <p><strong>Departamento:</strong> {user.departamento}</p>
                <p><strong>Ciudad:</strong> {user.ciudad}</p>
                <p><strong>Dirección:</strong> {user.direccion}</p>
                <p><strong>Género:</strong> {user.genero}</p>
                <p><strong>Tipo de Documento:</strong> {user.tipo_documento}</p>
                <p><strong>Documento:</strong> {user.documento}</p>
                <p><strong>Celular:</strong> {user.celular}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante para abrir el modal */}
      <button
        className="btn btn-warning buzon-float-button"
        onClick={() => setShowChat(true)}
        title="Ver Conversaciones"
      >
        💬
      </button>

      {/* Modal de Conversaciones */}
      <ModalBuzon
        show={showChat}
        onHide={() => setShowChat(false)}
        conversaciones={conversaciones}
      />
    </div>
  );
}

export default Perfil;
