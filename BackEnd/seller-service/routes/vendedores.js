const express = require("express");
const Vendedor = require("../models/Vendedor");

const router = express.Router();


//Obtener todos los vendedores (GET)
router.get("/", async (req, res) => {
    try {
        const vendedores = await Vendedor.find();
        res.json(vendedores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los vendedores", error });
    }
});

//Obtener un vendedor por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const vendedor = await Vendedor.findById(req.params.id);
        if (!vendedor) {
            return res.status(404).json({ mensaje: "Vendedor no encontrado" });
        }
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el vendedor", error });
    }
});

// Crear un nuevo vendedor (POST)
router.post("/", async (req, res) => {
    try {
        const nuevoVendedor = new Vendedor(req.body);
        await nuevoVendedor.save();
        res.status(201).json(nuevoVendedor);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el vendedor", error });
    }
});

// Actualizar un vendedor por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const vendedorActualizado = await Vendedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendedorActualizado) {
            return res.status(404).json({ mensaje: "Vendedor no encontrado" });
        }
        res.json(vendedorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el vendedor", error });
    }
});

// Eliminar un vendedor por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const vendedorEliminado = await Vendedor.findByIdAndDelete(req.params.id);
        if (!vendedorEliminado) {
            return res.status(404).json({ mensaje: "Vendedor no encontrado" });
        }
        res.json({ mensaje: "Vendedor eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el vendedor", error });
    }
});

router.get("/tiendas/:id_artesano", async (req, res) => {
    try {
        const { id_artesano } = req.params;
        const vendedores = await Vendedor.find({ id_artesano: id_artesano });

        if (vendedores.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron tiendas para ese artesano" });
        }

        res.json(vendedores);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar tiendas por id_artesano", error });
    }
});

module.exports = router;
