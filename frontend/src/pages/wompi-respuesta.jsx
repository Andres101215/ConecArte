import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const WompiRespuesta = () => {
  const [params] = useSearchParams();
  const transactionId = params.get("id");

  useEffect(() => {
  if (transactionId) {
    fetch(`https://conecarte-8olx.onrender.com/pagos/pagos/verificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Estado:", data);

        if (data.status === "APPROVED") {
          // Aquí creas la factura
          fetch(`https://conecarte-8olx.onrender.com/facturas/facturas/facturar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_usuario: localStorage.getItem("id_usuario"),
              id_transaccion: data.id,
              valor: data.amount_in_cents / 100, // valor en pesos
              metodo_pago: data.payment_method_type,
              referencia: data.reference,
              fecha: data.finalized_at,
            }),
          })
            .then(res => {
              if (!res.ok) throw new Error("No se pudo crear la factura");
              return res.json();
            })
            .then(factura => console.log("Factura creada:", factura))
            .catch(err => console.error("Error al crear factura:", err.message));
        } else {
          console.warn("Transacción no aprobada:", data.status);
        }
      })
      .catch(err => console.error("Error al verificar transacción:", err.message));
  }
}, [transactionId]);


  return <h2>Procesando resultado de pago...</h2>;
};

export default WompiRespuesta;
