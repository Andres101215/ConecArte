const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
      },
      apellido: {
        type: String,
        required: true,
        trim: true
      },
      correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validación de email
      },
      contraseña: {
        type: String,
        required: true,
        minlength: 8
      },
      tipo_usuario: {
        type: String,
        enum: ['usuario', 'vendedor', 'administrador'],
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      fecha_nacimiento: {
        type: Date,
        required: true
      },
      departamento: {
        type: String,
        required: true,
        trim: true
      },
      ciudad: {
        type: String,
        required: true,
        trim: true
      },
      direccion: {
        type: String,
        required: true,
        trim: true
      },
      genero: {
        type: String,
        enum: ['Femenino', 'Masculino', 'Otro'],
        required: true
      },
      tipo_documento: {
        type: String,
        enum: ['Cédula de Ciudadanía', 'Tarjeta de Identidad', 'Cédula de Extranjería', 'Pasaporte'],
        required: true
      },
      documento: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      celular: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/ // Validación para números de celular colombianos
      },
      fecha_creacion: {
        type: Date,
        default: Date.now
      }
}, { collection: "Usuario" }); // Forzamos el nombre de la colección

const Usuario = mongoose.model("Usuario", usuarioSchema); // El primer parámetro no afecta la colección en la BD

module.exports = Usuario;
