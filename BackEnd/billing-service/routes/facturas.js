const express = require("express");
const Factura = require("../models/factura");

const router = express.Router();


//Obtener todos las facturas (GET)
router.get("/", async (req, res) => {
    try {
        const factura = await Factura.find();
        res.json(factura);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las facturas", error });
    }
});

//Obtener una factura por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id);
        if (!factura) {
            return res.status(404).json({ mensaje: "Factura no encontrada" });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la factura", error });
    }
});

//Crear una nuevo factura (POST)
router.post("/", async (req, res) => {
    try {
        const nuevoFactura = new Factura(req.body);
        await nuevoFactura.save();
        res.status(201).json(nuevoFactura);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la factura", error });
    }
});

//Actualizar una factura por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const facturaActualizado = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!facturaActualizado) {
            return res.status(404).json({ mensaje: "Factura no encontrada" });
        }
        res.json(facturaActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la factura", error });
    }
});

//Eliminar una factura por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const facturaEliminado = await Factura.findByIdAndDelete(req.params.id);
        if (!facturaEliminado) {
            return res.status(404).json({ mensaje: "Factura no encontrada" });
        }
        res.json({ mensaje: "Factura eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la factura", error });
    }
});

module.exports = router;
