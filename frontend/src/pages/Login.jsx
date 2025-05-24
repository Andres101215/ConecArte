import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../Contexts/AuthContext';
import './Login.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://conecarte-8olx.onrender.com/usuarios/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // Guarda el token en contexto
        const decoded = jwtDecode(data.token);
        setMensaje('Inicio de sesión exitoso');
        localStorage.setItem("id_usuario", decoded.id);


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
    <div className="login-container">
      <div className="login-overlay">
        <form onSubmit={handleSubmit} className="login-form-box">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100">Entrar</button>

          {mensaje && <p className="text-danger mt-3 text-center">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
}
