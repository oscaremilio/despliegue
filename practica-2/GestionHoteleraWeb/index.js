// Añade las librerías necesarias
const mongoose = require("mongoose");
const express = require("express");
const nunjucks = require('nunjucks');
const methodOverride = require("method-override");
const dateFilter = require("nunjucks-date-filter");

// Crea una instancia de Express
let app = express();

// Uso de urlencoded (antes de methodOverride siempre)
app.use(express.urlencoded({ extended: true }));

// Para usar un campo "method" oculto en vez del propio del formulario
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Incorpora los modelos de datos
const Habitacion = require(__dirname + "/models/habitacion");
const Limpieza = require(__dirname + "/models/limpieza");
const Usuario = require(__dirname + "/models/usuario");

// Permite usar archivos estáticos 
app.use(express.static('public'));

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones.js");
const limpiezas = require(__dirname + "/routes/limpiezas.js");
const usuarios = require(__dirname + "/routes/usuarios.js");

// Conecta con la base de datos "hotel"
mongoose.connect("mongodb://127.0.0.1:27017/hotel");

// Configura el motor Nunjucks
const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch:true
});

// Añade el filtro de la fecha
env.addFilter("date", dateFilter);

// Asigna el motor de plantillas
app.set('view engine', 'njk');

// Middleware para peticiones
app.use(express.json());

// Permite acceder a la carpeta donde está disponible el CSS de Bootstrap 
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Enrutadores para cada grupo de rutas
app.use("/", habitaciones);
app.use("/", limpiezas);
app.use("/", usuarios);

// Se pone a escuchar por el puerto 
app.listen(8008);