// app.js
const express = require('express');
const mongoose = require('mongoose');
const productosRouter = require('./routes/productos');

const app = express();

app.use(express.json());
app.use('/productos', productosRouter);

module.exports = app; // 👈 exportamos solo la app SIN listen
