import React, { useState } from 'react';

export default function RegisterUser() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [username, setUsername] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Usuario'); 
  const fechaCreacion = new Date().toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      nombre,
      apellido,
      correo,
      contraseña,
      tipo_usuario: tipoUsuario,
      username,
      fecha_nacimiento: fechaNacimiento,
      departamento,
      ciudad,
      direccion,
      genero,
      tipo_documento: tipoDocumento,
      documento,
      celular,
      fecha_creacion: fechaCreacion,
    };
    console.log(userData);
    // Aquí luego se enviarán los datos al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro Usuario</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="date" placeholder="Fecha Nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
      <input type="text" placeholder="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
      <input type="text" placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
      <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="">Selecciona Género</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
        <option value="Otro">Otro</option>
      </select>
      <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
        <option value="">Selecciona Tipo Documento</option>
        <option value="T.I">T.I</option>
        <option value="C.C">C.C</option>
        <option value="Pasaporte">Pasaporte</option>
      </select>
      <input type="text" placeholder="Documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
      <input type="text" placeholder="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} />
      <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
        <option value="Usuario">Usuario</option>
        <option value="Vendedor">Vendedor</option>
      </select>
      <button type="submit">Registrarse</button>
    </form>
  );
}
