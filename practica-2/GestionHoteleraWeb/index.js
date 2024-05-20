// Añade las librerías necesarias
const mongoose = require("mongoose");
const express = require("express");

// Incorpora los modelos de datos
const Habitacion = require(__dirname + "/models/habitacion");
const Limpieza = require(__dirname + "/models/limpieza");
const Usuario = require(__dirname + "/models/usuario");

// Conexión a la base de datos "hotel"
mongoose.connect("mongodb://127.0.0.1:27017/hotel");

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones.js");
const limpiezas = require(__dirname + "/routes/limpiezas.js");
const usuarios = require(__dirname + "/routes/usuarios.js");


// Crea una instancia de Express
app = express();

// Middleware para peticiones
app.use(express.json());

// Enrutamiento

// Enrutadores para cada grupo de rutas
app.use("/", habitaciones);
app.use("/", limpiezas);
app.use("/", usuarios);

// Se pone a escuchar por el puerto 
app.listen(8080);