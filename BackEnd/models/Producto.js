const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    id: Number,
    id_artesano: Number,
    nombre: String,
    descripcion: String,
    precio: Number,
    cantidad: Number,
    ubicacion: String,
    fecha_creacion: Date
}, { collection: "Producto" }); // Forzamos el nombre de la colección

const Producto = mongoose.model("Producto", productoSchema); // El primer parámetro no afecta la colección en la BD

module.exports = Producto;
