import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../Contexts/AuthContext'; // 👈 Importa el contexto

export default function Login() {
  const { login } = useAuth(); // 👈 Usa login del contexto
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
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // 👈 Aquí llamamos login del contexto

        const decoded = jwtDecode(data.token);
        setMensaje('Inicio de sesión exitoso');



        // Redirige según tipo de usuario


        
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
            window.location.href = "/";
            break;
        }

      } else {
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
