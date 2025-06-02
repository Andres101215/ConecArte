import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import './MisTiendas.css';
import ModalProductos from "../components/ModalProductos";

const id_usuario = localStorage.getItem("id_usuario");

function MisTiendas() {
  const [tiendas, setTiendas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productosTienda, setProductosTienda] = useState([]);
  const [nombreTienda, setNombreTienda] = useState("");

useEffect(() => {
  const obtenerTiendas = async () => {
    try {
      const response = await fetch('https://conecarte-8olx.onrender.com/vendedores/vendedores/tiendas/' + id_usuario);
      const data = await response.json();
      setTiendas(data);
    } catch (error) {
      console.error('Error al obtener las tiendas:', error);
    }
  };

  obtenerTiendas();
}, []);


  const handleVerProductos = (tienda) => {
    // Simulación de productos con la estructura del esquema Producto
    const productosSimulados = tienda._id === "1"
      ? [
          {
            id: "p1",
            id_artesano: tienda.id_usuario,
            nombre: "Tejido andino",
            descripcion: "Hecho a mano con lana de alpaca",
            precio: 25.5,
            cantidad: 10,
            ubicacion: "Cuzco, Perú",
            fecha_creacion: "2024-01-15",
            id_categoria: "textil"
          },
          {
            id: "p2",
            id_artesano: tienda.id_usuario,
            nombre: "Jarrón de barro",
            descripcion: "Cerámica tradicional",
            precio: 40,
            cantidad: 5,
            ubicacion: "Arequipa",
            fecha_creacion: "2024-02-10",
            id_categoria: "cerámica"
          }
        ]
      : [
          {
            id: "p3",
            id_artesano: tienda.id_usuario,
            nombre: "Vela ecológica",
            descripcion: "Hecha con cera de abeja",
            precio: 15.0,
            cantidad: 20,
            ubicacion: "Lima",
            fecha_creacion: "2024-03-12",
            id_categoria: "ecológico"
          },
          {
            id: "p4",
            id_artesano: tienda.id_usuario,
            nombre: "Jabón artesanal",
            descripcion: "Ingredientes naturales",
            precio: 8.0,
            cantidad: 30,
            ubicacion: "Cusco",
            fecha_creacion: "2024-03-15",
            id_categoria: "ecológico"
          }
        ];

    setProductosTienda(productosSimulados);
    setNombreTienda(tienda.nombre_tienda);
    setShowModal(true);
  };

  return (
    <div className="mis-tiendas-background">
      <div className="overlay">
        <div className="container tienda-contenedor">
          <h2 className="text-white text-center mb-4">Mis Tiendas</h2>
          <div className="bg-white p-4 rounded shadow">
            <Table responsive bordered hover className="text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre de la Tienda</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tiendas.map((tienda, index) => (
                  <tr key={tienda._id}>
                    <td>{index + 1}</td>
                    <td>{tienda.nombre_tienda}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleVerProductos(tienda)}
                      >
                        <EyeFill />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal de productos */}
      <ModalProductos
        show={showModal}
        onHide={() => setShowModal(false)}
        productos={productosTienda}
        nombreTienda={nombreTienda}
      />
    </div>
  );
}

export default MisTiendas;
