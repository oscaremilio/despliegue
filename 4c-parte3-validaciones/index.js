// Librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const methodOverride = require("method-override");

// Servidor Express
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

// Permite usar archivos estáticos 
app.use(express.static('public'));

// Enrutadores
const auth = require(__dirname + '/routes/auth');
const libros = require(__dirname + '/routes/libros');

// Conexión con la BD
mongoose.connect('mongodb://127.0.0.1:27017/libros2');

// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

// Asignación del motor de plantillas
app.set('view engine', 'njk');

// Middleware para peticiones POST y PUT
// Middleware para entrada por formularios
// Middleware para estilos Bootstrap
// Enrutadores para cada grupo de rutas
app.use(express.json());

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', libros);

// Puesta en marcha del servidor
app.listen(8080);