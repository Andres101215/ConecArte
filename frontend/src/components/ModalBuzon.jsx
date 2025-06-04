import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';

const ModalBuzon = ({ show, onHide }) => {
  const [conversaciones, setConversaciones] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const id_usuario = localStorage.getItem('id_usuario');
    if (!show || !id_usuario) return;

    const obtenerConversaciones = async () => {
      try {
        const res = await fetch(`https://conecarte-1.onrender.com/conversaciones/usuario/${id_usuario}`);
        const data = await res.json();

        const conversacionesConMensajes = await Promise.all(
          data.map(async (conv) => {
            const mensajesData = await Promise.all(
              conv.mensajes.map(async (idMensaje) => {
                const resMsg = await fetch(`https://conecarte-1.onrender.com/mensajes/${idMensaje}`);
                return await resMsg.json();
              })
            );

            const otroUsuarioId = conv.id_emisor === id_usuario ? conv.id_receptor : conv.id_emisor;

            // 🔍 Obtener username del otro usuario
            const resUser = await fetch(`https://conecarte-1.onrender.com/usuarios/usuarios/${otroUsuarioId}`);
            const usuarioData = await resUser.json();

            return {
              id_conversacion: conv._id,
              user: usuarioData.username, // Mostrará el nombre de usuario en la lista
              id_usuario: otroUsuarioId,  // Puedes conservarlo por si necesitas enviarle algo luego
              mensajes: mensajesData.map(msg => ({
                emisor: msg.id_emisor === id_usuario,
                texto: msg.contenido,
                fecha: msg.fecha_envio,
                estado: msg.estado_mensaje
              }))
            };
          })
        );

        setConversaciones(conversacionesConMensajes);
      } catch (error) {
        console.error("Error al obtener conversaciones:", error);
      }
    };

    obtenerConversaciones();
  }, [show]);

  const abrirChat = (usuario) => {
    setSelectedUser(usuario);
  };

  const enviarMensaje = async () => {
    if (newMessage.trim() === '' || !selectedUser) return;

    const id_usuario = localStorage.getItem('id_usuario');

    try {
      const res = await fetch('https://conecarte-1.onrender.com/conversaciones/mensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_conversacion: selectedUser.id_conversacion,
          id_emisor: id_usuario,
          contenido: newMessage
        })
      });

      if (!res.ok) {
        throw new Error('Error al enviar mensaje');
      }

      const data = await res.json();

      const actualizado = conversaciones.map((conv) =>
        conv.id_conversacion === selectedUser.id_conversacion
          ? {
            ...conv,
            mensajes: [
              ...conv.mensajes,
              {
                emisor: true,
                texto: newMessage,
                fecha: new Date().toISOString(),
                estado: 'no leído'
              }
            ]
          }
          : conv
      );

      setConversaciones(actualizado);

      // Actualizar también el selectedUser con los mensajes nuevos
      const actualizadaConversacion = actualizado.find(
        (conv) => conv.id_conversacion === selectedUser.id_conversacion
      );
      setSelectedUser(actualizadaConversacion);

      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Mis Conversaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white d-flex" style={{ minHeight: '300px' }}>
        <div className="w-25 border-end pe-2">
          <ListGroup variant="flush">
            {conversaciones.map((conv, i) => (
              <ListGroup.Item
                key={i}
                onClick={() => abrirChat(conv)}
                className="bg-secondary text-white mb-2 rounded"
                style={{ cursor: 'pointer' }}
              >
                {conv.user}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div className="w-75 ps-3 d-flex flex-column">
          <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: '300px' }}>
            {selectedUser ? (
              selectedUser.mensajes.map((msg, i) => (
                <div
                  key={i}
                  className={`d-flex ${msg.emisor ? 'justify-content-end' : 'justify-content-start'} mb-2`}
                >
                  <div
                    className={`p-2 rounded ${msg.emisor ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                    style={{ maxWidth: '75%' }}
                  >
                    {msg.texto}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Selecciona una conversación.</p>
            )}
          </div>

          {selectedUser && (
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button variant="success" className="ms-2" onClick={enviarMensaje}>
                Enviar
              </Button>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBuzon;
