const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String,
    tipo_usuario: String,
    username: {
        type: String,
        unique: true, // Aseguramos que el username sea único
        required: true // Aseguramos que el username sea requerido
    },
    fecha_nacimiento: Date,
    departamento: String,
    ciudad: String,
    direccion: String,
    genero: String,
    tipo_documento: String,
    documento: String,
    celular: String,
    fecha_creacion: Date
}, { collection: "Usuario" }); // Forzamos el nombre de la colección

const Usuario = mongoose.model("Usuario", usuarioSchema); // El primer parámetro no afecta la colección en la BD

module.exports = Usuario;
