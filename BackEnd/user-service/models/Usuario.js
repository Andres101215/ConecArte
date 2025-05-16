const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String,
    tipo_usuario: String,
    username: String,
    fecha_nacimiento: Date,
    departamento: String,
    ciudad: String,
    direccion: String,
    genero: String,
    tipo_documento: String,
    documento: String,
    celular: String,
    fecha_creacion: Date
}, { collection: "Usuario" }); 

const Usuario = mongoose.model("Usuario", usuarioSchema); 

module.exports = Usuario;
