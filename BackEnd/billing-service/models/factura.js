const mongoose = require("mongoose");

const facturaSchema = new mongoose.Schema({
    id: String,
    id_carrito: String,
    fecha: Date,
    referencia: String
}, { collection: "Facturacion" }); // Forzamos el nombre de la colección

const Facturacion = mongoose.model("Facturacion", facturaSchema); // El primer parámetro no afecta la colección en la BD

module.exports = Facturacion;
