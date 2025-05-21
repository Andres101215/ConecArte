import React, { useState } from 'react';
import './RegisterSeller.css';
import tiendaFondo from '../assets/tienda.webp'; // Asegúrate de tener esta imagen

export default function RegisterSeller() {
  const [nombreTienda, setNombreTienda] = useState('');
  const [descripcionTienda, setDescripcionTienda] = useState('');
  const [categorias, setCategorias] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [redesSociales, setRedesSociales] = useState('');
  const [validated, setValidated] = useState(false);
  const fechaRegistro = new Date().toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (e.currentTarget.checkValidity() === false) {
      return;
    }

    const tiendaData = {
      nombre_tienda: nombreTienda,
      descripcion_tienda: descripcionTienda,
      categorias: categorias.split(',').map(cat => cat.trim()),
      experiencia: parseInt(experiencia),
      redes_sociales: redesSociales.split(',').map(red => red.trim()),
      fecha_registro: fechaRegistro,
    };

    console.log(tiendaData);
    alert('Tienda registrada con éxito');
    // Aquí luego se enviarán los datos al backend
  };

  return (
    <div
      className="register-background"
      style={{ backgroundImage: `url(${tiendaFondo})` }}
    >
      <div className="overlay">
        <div className="container form-container p-4">
          <h2
            className="mb-4 text-center text-primary"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Registro de Tienda
          </h2>
          <form
            className={`needs-validation ${validated ? 'was-validated' : ''}`}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de la tienda"
                value={nombreTienda}
                onChange={(e) => setNombreTienda(e.target.value)}
                required
              />
              <div className="invalid-feedback">Por favor ingresa el nombre de la tienda.</div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                value={descripcionTienda}
                onChange={(e) => setDescripcionTienda(e.target.value)}
                required
              />
              <div className="invalid-feedback">Por favor ingresa una descripción.</div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Categorías (separadas por coma)"
                value={categorias}
                onChange={(e) => setCategorias(e.target.value)}
                required
              />
              <div className="invalid-feedback">Por favor ingresa al menos una categoría.</div>
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Años de experiencia"
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                required
                min={0}
              />
              <div className="invalid-feedback">Por favor ingresa tu experiencia en años.</div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Redes sociales (separadas por coma)"
                value={redesSociales}
                onChange={(e) => setRedesSociales(e.target.value)}
                required
              />
              <div className="invalid-feedback">Por favor ingresa al menos una red social.</div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Registrar Tienda</button>
          </form>
        </div>
      </div>
    </div>
  );
}
