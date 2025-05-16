import React from "react";
import WompiPago from "../components/WompiPago";

const PaginaPago = () => {
  const pasarelaDePago = {
    total: 28000 // en pesos
  };

  return (
    <div>
      <h2>Página de pago</h2>
      <WompiPago pasarelaDePago={pasarelaDePago} />
    </div>
  );
};

export default PaginaPago;
