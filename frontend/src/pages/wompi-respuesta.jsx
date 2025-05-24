import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const WompiRespuesta = () => {
  const [params] = useSearchParams();
  const transactionId = params.get("id");

  useEffect(() => {
    if (transactionId) {
      fetch(`https://conecarte-8olx.onrender.com/pagos/verificar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      })
        .then(res => res.json())
        .then(data => console.log("Estado:", data));
    }
  }, [transactionId]);

  return <h2>Procesando resultado de pago...</h2>;
};

export default WompiRespuesta;
