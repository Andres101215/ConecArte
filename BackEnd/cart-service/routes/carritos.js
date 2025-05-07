const express = require("express");
const Carrito = require("../models/Carrito");
const router = express.Router();

// Obtener todos los carritos (GET)
router.get("/", async (req, res) => {
    try {
        const carritos = await Carrito.find();
        res.json(carritos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los carritos", error });
    }
});

//Obtener un carrito por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const carrito = await Carrito.findById(req.params.id);
        if (!carrito) {
            return res.status(404).json({ mensaje: "carrito no encontrado" });
        }
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el carrito", error });
    }
});

// Crear un nuevo carrito (POST)
router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = new Carrito(req.body);
        await nuevoCarrito.save();
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el carrito", error });
    }
});

//Actualizar un carrito por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const carritoActualizado = await Carrito.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!carritoActualizado) {
            return res.status(404).json({ mensaje: "Carrito no encontrado" });
        }
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el carrito", error });
    }
});

// Eliminar un carrito por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const carritoEliminado = await Carrito.findByIdAndDelete(req.params.id);
        if (!carritoEliminado) {
            return res.status(404).json({ mensaje: "Carrito no encontrado" });
        }
        res.json({ mensaje: "Carrito eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el carrito", error });
    }
});

module.exports = router;
