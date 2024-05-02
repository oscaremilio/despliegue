const mongoose = require("mongoose");
const express = require("express");

mongoose.connect('mongodb://127.0.0.1:27017/hotel');

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones.js");
const limpiezas = require(__dirname + "/routes/limpiezas.js");

// Crea una instancia de Express
let app = express();

// Middleware para peticiones
app.use(express.json());

// Enrutadores para cada grupo de rutas
app.use("/habitaciones", habitaciones);
app.use("/limpiezas", limpiezas);

// Se pone a escuchar por el puerto 
app.listen(8080);