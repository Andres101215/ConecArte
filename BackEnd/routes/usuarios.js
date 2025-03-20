const express = require("express");
const Usuario = require("../models/Usuario");

const router = express.Router();


// 📌 Obtener todos los productos (GET)
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error });
    }
});

// 📌 Obtener un producto por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ id: req.params.id });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario", error });
    }
});

// 📌 Crear un nuevo producto (POST)
router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el usuario", error });
    }
});

// 📌 Actualizar un producto por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario", error });
    }
});

// 📌 Eliminar un producto por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findOneAndDelete({ id: req.params.id });
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario", error });
    }
});

module.exports = router;
