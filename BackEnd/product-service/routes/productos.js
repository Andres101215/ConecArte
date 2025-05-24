const express = require("express");
const Producto = require("../models/Producto");

const router = express.Router();


//Obtener todos los productos (GET)
router.get("/", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error });
    }
});

// Obtener un producto por ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error });
    }
});

// Crear un nuevo producto (POST)
router.post("/", async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el producto", error });
    }
});

// Actualizar un producto por ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error });
    }
});

// Eliminar un producto por ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto", error });
    }
});


router.post("/detalles", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ mensaje: "Debe enviar un array de ids de productos" });
    }

    const productos = await Producto.find({ _id: { $in: ids } });

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
});


module.exports = router;
