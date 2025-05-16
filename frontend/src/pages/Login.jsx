import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";


export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo,
          contraseña
        })
      });
      const data = await response.json();

      if (response.ok) {
        // Por ejemplo, guardar token en localStorage
        localStorage.setItem('token', data.token);
        setMensaje('Inicio de sesión exitoso');
        console.log('Token recibido:', data.token);
        const decoded = jwtDecode(data.token);
        console.log("Tipo de usuario:", decoded.tipo_usuario);
        console.log("Id de usuario:", decoded.id);


        switch (decoded.tipo_usuario) {

          case "administrador":
            window.location.href = "/panelAdmin";
            break;
          case "usuario":
            window.location.href = "/panelUser";
            break;
          case "vendedor":
            window.location.href = "/panelSeller";
            break;

          default:
            // En caso de que no coincida con ningún tipo
            console.warn("Tipo de usuario desconocido");
            window.location.href = "/login";
            break;
        }
      } else {
        // Error de autenticación
        setMensaje(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMensaje('Error de red. Intenta más tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
