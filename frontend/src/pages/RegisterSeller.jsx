import React, { useState } from 'react';

export default function RegisterSeller() {
  const [nombreTienda, setNombreTienda] = useState('');
  const [descripcionTienda, setDescripcionTienda] = useState('');
  const [categorias, setCategorias] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [redesSociales, setRedesSociales] = useState('');
  const fechaRegistro = new Date().toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tiendaData = {
      nombre_tienda: nombreTienda,
      descripcion_tienda: descripcionTienda,
      categorias: categorias.split(',').map(cat => cat.trim()),
      experiencia: parseInt(experiencia),
      redes_sociales: redesSociales.split(',').map(red => red.trim()),
      fecha_registro: fechaRegistro,
    };
    console.log(tiendaData);
    // Aquí luego se enviarán los datos al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro Tienda</h2>
      <input type="text" placeholder="Nombre Tienda" value={nombreTienda} onChange={(e) => setNombreTienda(e.target.value)} />
      <input type="text" placeholder="Descripción Tienda" value={descripcionTienda} onChange={(e) => setDescripcionTienda(e.target.value)} />
      <input type="text" placeholder="Categorías (separadas por coma)" value={categorias} onChange={(e) => setCategorias(e.target.value)} />
      <input type="number" placeholder="Experiencia (años)" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} />
      <input type="text" placeholder="Redes Sociales (separadas por coma)" value={redesSociales} onChange={(e) => setRedesSociales(e.target.value)} />
      <button type="submit">Registrar Tienda</button>
    </form>
  );
}
