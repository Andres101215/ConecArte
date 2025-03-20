const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    id: Number,
    id_artesano: Number,
    nombre: String,
    descripcion: String,
    precio: Number,
    cantidad: Number,
    ubicacion: String,
    fecha_creacion: Date
}, { collection: "Usuario" }); // Forzamos el nombre de la colección

const Usuario = mongoose.model("Usuario", usuarioSchema); // El primer parámetro no afecta la colección en la BD

module.exports = Usuario;
