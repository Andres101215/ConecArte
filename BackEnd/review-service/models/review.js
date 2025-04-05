// models/Vendedor.js
const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  nombre_tienda: String,
  descripcion_tienda:  String,
   categorias:  [String],
  experiencia:Number,
  redes_sociales: [String],
  productos: String, 
  fecha_registro: Date,
  id_usuario:String
}, { collection: "Reseña" }); // Forzamos el nombre de la colección

const Resena = mongoose.model('Reseña', resenaSchema);
module.exports = Resena;
