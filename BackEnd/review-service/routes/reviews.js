const express = require("express");
const Resena = require("../models/review");

const router = express.Router();


// 📌 Obtener todos los productos (GET)
router.get("/", async (req, res) => {
    try {
        const resena = await Resena.find();
        res.json(resena);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las reseñas", error });
    }
});

// 📌 Obtener un producto por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const resena = await Resena.findById(req.params.id);
        if (!resena) {
            return res.status(404).json({ mensaje: "Reseña no encontrada" });
        }
        res.json(resena);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la reseña", error });
    }
});

// 📌 Crear un nuevo producto (POST)
router.post("/", async (req, res) => {
    try {
        const nuevaResena = new Resena(req.body);
        await nuevaResena.save();
        res.status(201).json(nuevaResena);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la reseña", error });
    }
});

// 📌 Actualizar un producto por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const resenaActualizado = awaitresena.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resenaActualizado) {
            return res.status(404).json({ mensaje: "Reseña no encontrada" });
        }
        res.json(resenaActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la reseña", error });
    }
});

// 📌 Eliminar un producto por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const resenaEliminado = await Resena.findOneAndDelete(req.params.id);
        if (!resenaEliminado) {
            return res.status(404).json({ mensaje: "Reseña no encontrada" });
        }
        res.json({ mensaje: "Reseña eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la reseña", error });
    }
});

module.exports = router;
