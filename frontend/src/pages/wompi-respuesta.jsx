import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./WompiRespuesta.css"; // asegúrate de crear este archivo CSS

const WompiRespuesta = () => {
  const [params] = useSearchParams();
  const transactionId = params.get("id");
  const [mensaje, setMensaje] = useState("Procesando tu transacción...");
  const [estado, setEstado] = useState("cargando"); // "exito", "error", "no_aprobada"

  useEffect(() => {
    if (transactionId) {
      fetch(`https://conecarte-8olx.onrender.com/pagos/pagos/verificar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "APPROVED") {
            fetch(`https://conecarte-8olx.onrender.com/facturas/facturas/facturar`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id_usuario: localStorage.getItem("id_usuario"),
                id_transaccion: data.id,
                valor: data.amount_in_cents / 100,
                metodo_pago: data.payment_method_type,
                referencia: data.reference,
                fecha: data.finalized_at,
              }),
            })
              .then(res => res.json())
              .then(() => {
                setMensaje("🎉 Tu transacción terminó con éxito. ¡Gracias por comprar con ConectArte!");
                setEstado("exito");
              })
              .catch(() => {
                setMensaje("❌ Error al crear tu factura.");
                setEstado("error");
              });
          } else {
            setMensaje("⚠️ Tu transacción no fue aprobada.");
            setEstado("no_aprobada");
          }
        })
        .catch(() => {
          setMensaje("❌ Error al verificar la transacción.");
          setEstado("error");
        });
    }
  }, [transactionId]);

  return (
    <div className={`resultado ${estado}`}>
      {estado === "exito" && <div className="checkmark">✅</div>}
      <h2>{mensaje}</h2>
    </div>
  );
};

export default WompiRespuesta;
