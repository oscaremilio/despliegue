// Librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

// Enrutadores
const auth = require(__dirname + '/routes/auth');
const libros = require(__dirname + '/routes/libros');

// Conexión con la BD
mongoose.connect('mongodb://127.0.0.1:27017/libros2');

// Servidor Express
let app = express();

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Middleware para peticiones POST y PUT
// Middleware para estilos Bootstrap
// Enrutadores para cada grupo de rutas
app.use(express.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', libros);

// Puesta en marcha del servidor
app.listen(8080);