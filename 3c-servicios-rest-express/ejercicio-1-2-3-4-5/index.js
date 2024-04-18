// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");

// Incorpora los modelos de datos
const Autor = require(__dirname + "/models/autor");
const Libro = require(__dirname + "/models/libro");

mongoose.connect("mongodb://127.0.0.1:27017/libros2");

// Crea una instancia de Express
let app = express();

// Crea un servicio GET que devuelve el listado completo de libros
app.get("/libros", (req, res) => {
    Libro.find()
    .populate("autor")
    .populate("comentarios")
    .then(resultado => {
        res.status(200).send({ok:true, resultado: resultado});
    }).catch(error => {
        res.status(500).send({ok: false, error: "Error obteniendo libros"});
    });
});

// Crea un servicio GET que devuelve los datos del libro a partir de su id
app.get("/libros/:id", (req, res) => {
    Libro.findById(req.params.id)
    .populate("autor")
    .populate("comentarios")
    .then(resultado => {
        if (resultado) {
            res.status(200).send({ok:true, resultado: resultado}); 
        } else {
            res.status(400).send({ok:false, error: "No se han econtrado libros"});
        }
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error buscando el libro indicado"});
    });
});

// Se pone a escuchar por el puerto 8080
app.listen(8080);

