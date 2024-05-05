const mongoose = require("mongoose");
const express = require("express");

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones.js");
const limpiezas = require(__dirname + "/routes/limpiezas.js");

// Conexión a la base de datos "hotel"
mongoose.connect("mongodb://127.0.0.1:27017/hotel");

// Crea una instancia de Express
app = express();

// Middleware para peticiones
app.use(express.json());

// Enrutadores para cada grupo de rutas
app.use("/", habitaciones);
app.use("/", limpiezas);






// Se pone a escuchar por el puerto 
app.listen(8080);