import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import './Perfil.css';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalBuzon from '../components/ModalBuzon'; // Asegúrate de que la ruta es correcta

function Perfil() {
  const { user } = useAuth();

  const [showChat, setShowChat] = useState(false);

  // Simulación de conversaciones
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

  if (!user)
    return (
      <div className="overlay">
        <h3 className="text-white">No has iniciado sesión.</h3>
      </div>
    );

  return (
    <div className="perfil-container">
      <div className="overlay">
        <div className="card perfil-card shadow-lg">
          <div className="card-body text-center">
            <FaUserCircle size={100} className="text-secondary mb-4" />
            <h4 className="text-white">Perfil de Usuario</h4>

            <hr className="bg-light" />

            <div className="text-start text-white bandera-texto mt-3">
              <p><strong>Nombre:</strong> {/* user.nombre */}</p>
              <p><strong>Apellido:</strong> {/* user.apellido */}</p>
              <p><strong>Correo:</strong> {/* user.correo */}</p>
              <p><strong>Username:</strong> {/* user.username */}</p>
              <p><strong>Tipo de Usuario:</strong> {user.tipo_usuario}</p>
              <p><strong>Fecha de Nacimiento:</strong> {/* user.fecha_nacimiento */}</p>
              <p><strong>Departamento:</strong> {/* user.departamento */}</p>
              <p><strong>Ciudad:</strong> {/* user.ciudad */}</p>
              <p><strong>Dirección:</strong> {/* user.direccion */}</p>
              <p><strong>Género:</strong> {/* user.genero */}</p>
              <p><strong>Tipo de Documento:</strong> {/* user.tipo_documento */}</p>
              <p><strong>Documento:</strong> {/* user.documento */}</p>
              <p><strong>Celular:</strong> {/* user.celular */}</p>
              <p><strong>Fecha de creación:</strong> {/* user.fecha_creacion */}</p>
            </div>

            {/* Botón para abrir modal de conversaciones */}
            <Button variant="warning" className="mt-3" onClick={() => setShowChat(true)}>
              Ver Conversaciones
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Conversaciones reutilizable */}
      <ModalBuzon
        show={showChat}
        onHide={() => setShowChat(false)}
        conversaciones={conversaciones}
      />
    </div>
  );
}

export default Perfil;
