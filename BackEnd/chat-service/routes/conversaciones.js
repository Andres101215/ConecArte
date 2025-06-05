const express = require("express");
const Conversacion = require("../models/Conversacion");
const Mensaje = require('../models/Mensaje');
const router = express.Router();


//Obtener todos las conversaciones (GET)
router.get("/", async (req, res) => {
    try {
        const conversacion = await Conversacion.find();
        res.json(conversacion);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las conversaciones", error });
    }
});

//Obtener una conversacion por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const conversacion = await Conversacion.findById(req.params.id);
        if (!conversacion) {
            return res.status(404).json({ mensaje: "Conversacion no encontrada" });
        }
        res.json(conversacion);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la conversacion", error });
    }
});

// Crear una nueva conversación (POST)
router.post("/", async (req, res) => {
  const { id_emisor, id_receptor, mensajes } = req.body;

  try {
    // Verificar si ya existe una conversación entre los dos usuarios
    const conversacionExistente = await Conversacion.findOne({
      $or: [
        { id_emisor, id_receptor },
        { id_emisor: id_receptor, id_receptor: id_emisor }
      ]
    });

    if (conversacionExistente) {
      return res.status(200).json({
        mensaje: "Ya existe una conversación entre estos usuarios.",
        conversacion: conversacionExistente
      });
    }

    // Crear la conversación si no existe
    const nuevaConversacion = new Conversacion({ id_emisor, id_receptor, mensajes });
    await nuevaConversacion.save();

    res.status(201).json(nuevaConversacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la conversacion", error });
  }
});


//Actualizar una conversacion por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const conversacionActualizado = await Conversacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!conversacionActualizado) {
            return res.status(404).json({ mensaje: "Conversacion no encontrada" });
        }
        res.json(conversacionActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la conversacion", error });
    }
});

//Eliminar una conversacion por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const conversacionEliminado = await Conversacion.findByIdAndDelete(req.params.id);
        if (!conversacionEliminado) {
            return res.status(404).json({ mensaje: "Conversacion no encontrada" });
        }
        res.json({ mensaje: "Conversacion eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la conversacion", error });
    }
});

router.get('/usuario/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const conversaciones = await Conversacion.find({
      $or: [
        { id_emisor: id_usuario },
        { id_receptor: id_usuario }
      ]
    });
    res.status(200).json(conversaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las conversaciones', error });
  }
});


// POST: Crear un mensaje y vincularlo a una conversación
router.post('/mensaje', async (req, res) => {
  try {
    const { id_conversacion, id_emisor, contenido } = req.body;

    if (!id_conversacion || !id_emisor || !contenido) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Crear nuevo mensaje
    const nuevoMensaje = new Mensaje({
      id_emisor,
      contenido,
      fecha_envio: new Date(),
      estado_mensaje: 'no leído' // o el estado inicial que uses
    });

    const mensajeGuardado = await nuevoMensaje.save();

    // Agregar mensaje a la conversación
    const conversacion = await Conversacion.findById(id_conversacion);
    if (!conversacion) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }

    conversacion.mensajes.push(mensajeGuardado._id);
    await conversacion.save();

    res.status(201).json({ mensaje: 'Mensaje enviado y guardado', mensajeGuardado });
  } catch (error) {
    console.error("Error al crear mensaje:", error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
