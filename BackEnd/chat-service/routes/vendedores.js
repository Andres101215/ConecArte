const express = require("express");
const Vendedor = require("../models/Vendedor");

const router = express.Router();


// 📌 Obtener todos los productos (GET)
router.get("/", async (req, res) => {
    try {
        const vendedores = await Vendedor.find();
        res.json(vendedores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los vendedores", error });
    }
});

// 📌 Obtener un producto por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const vendedor = await Vendedor.findOne({ id: req.params.id });
        if (!vendedor) {
            return res.status(404).json({ mensaje: "Vendedor no encontrado" });
        }
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el vendedor", error });
    }
});

// 📌 Crear un nuevo producto (POST)
router.post("/", async (req, res) => {
    try {
        const nuevoVendedor = new Vendedor(req.body);
        await nuevoVendedor.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el vendedor", error });
    }
});

// 📌 Actualizar un producto por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const vendedorActualizado = await Vendedor.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true }
        );
        if (!vendedorActualizado) {
            return res.status(404).json({ mensaje: "Vendedor no encontrado" });
        }
        res.json(vendedorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el vendedor", error });
    }
});

// 📌 Eliminar un producto por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const vendedorEliminado = await Usuario.findOneAndDelete({ id: req.params.id });
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Vendedor no encontrado" });
        }
        res.json({ mensaje: "Vendedor eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el vendedor", error });
    }
});

module.exports = router;
