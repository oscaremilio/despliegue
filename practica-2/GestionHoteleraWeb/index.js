// Añade las librerías necesarias
const mongoose = require("mongoose");
const express = require("express");
const nunjucks = require('nunjucks');
const dateFilter = require("nunjucks-date-filter");

// Crea una instancia de Express
app = express();

// Incorpora los modelos de datos
const Habitacion = require(__dirname + "/models/habitacion");
const Limpieza = require(__dirname + "/models/limpieza");
const Usuario = require(__dirname + "/models/usuario");

// Conecta con la base de datos "hotel"
mongoose.connect("mongodb://127.0.0.1:27017/hotel");

// Configura el motor Nunjucks
const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Añade el filtro de la fecha
env.addFilter("date", dateFilter);

// Asigna el motor de plantillas
app.set('view engine', 'njk');

// Permite usar archivos estáticos 
app.use(express.static('public'));

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones.js");
const limpiezas = require(__dirname + "/routes/limpiezas.js");
const usuarios = require(__dirname + "/routes/usuarios.js");

// Middleware para peticiones
app.use(express.json());

// Permite acceder a la carpeta donde está disponible el CSS de Bootstrap 
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Enrutadores para cada grupo de rutas
app.use("/", habitaciones);
app.use("/", limpiezas);
app.use("/", usuarios);

// Se pone a escuchar por el puerto 
app.listen(8080);