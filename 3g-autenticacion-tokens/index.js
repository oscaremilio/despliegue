// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");

// Incorpora los modelos de datos
const Libro = require(__dirname + "/models/libro");

// Conecta a la base de datos de MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/libros2");

// Enrutadores
const libros = require(__dirname + "/routes/libros.js");
const auth = require(__dirname + "/routes/auth.js");

// Crea una instancia de Express
let app = express();

// Añade un middleware para trabajar con objetos JSON en el servidor Express
app.use(express.json());

// Enrutador para el grupo de rutas
app.use("/", libros);
app.use("/", auth);

// Se pone a escuchar por el puerto 8080
app.listen(8080);