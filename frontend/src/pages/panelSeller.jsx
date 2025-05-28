import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PanelSeller.css';
import ModalBuzon from '../components/ModalBuzon'; // nuevo import

function PanelSeller() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [showBuzon, setShowBuzon] = useState(false); // stado del modal
  const conversaciones = [
  {
    user: 'cliente_juan',
    mensajes: [
      { emisor: false, texto: 'Hola, estoy interesado en tu producto.' },
      { emisor: true, texto: '¡Perfecto! ¿Cuál te gusta?' }
    ]
  },
  {
    user: 'comprador_maria',
    mensajes: [
      { emisor: true, texto: 'Hola, ¿necesitas ayuda?' },
      { emisor: false, texto: 'Sí, ¿qué colores tienes?' }
    ]
  }
];

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://conecarte-8olx.onrender.com/productos/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="text-center mt-5 text-white">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className="panel-seller-overlay">
      <div className="container mt-5">
        <h1 className="text-white text-center mb-4">Bienvenido Vendedor</h1>
        <div className="grid-container">
          {productos.map((producto) => (
            <Link to={`/producto/${producto._id}`} key={producto._id} className="card-link">
              <div className="card">
                <img src={producto.imagen} alt={producto.nombre} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text precio-rojo">${producto.precio}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button className="btn btn-secondary mis-tiendas-btn" onClick={() => navigate("/mistiendas")}>Mis Tiendas</button>
      <button className="btn btn-primary buzon-btn" onClick={() => setShowBuzon(true)}>Buzón</button>

      {/* Modal Buzón */}
          <ModalBuzon
            show={showBuzon}
            onHide={() => setShowBuzon(false)}
            conversaciones={conversaciones}
          />    </div>
  );
}

export default PanelSeller;
