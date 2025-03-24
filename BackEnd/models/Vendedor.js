// models/Vendedor.js
const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre_tienda: String,
  descripcion_tienda:  String,
   categorias:  [String],
  experiencia:Number,
  redes_sociales: [String],
  productos: String, 
  fecha_registro: Date,
  id_usuario:String
}, { collection: "Vendedor" }); // Forzamos el nombre de la colección

const Vendedor = mongoose.model('Vendedor', vendedorSchema);
module.exports = Vendedor;
