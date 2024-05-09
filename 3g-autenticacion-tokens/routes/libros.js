// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");
const auth = require(__dirname + "/../utils/auth.js");
const router = express.Router();

// Incorpora los modelos de datos
const Libro = require(__dirname + "../models/libro.js");

// Crea un servicio GET que devuelve el listado completo de libros
router.get("/libros", (req, res) => {
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
router.get("/libros/:id", (req, res) => {
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

// Añade el servicio POST para insertar un nuevo libro
router.post("/libros", (req, res) => {
    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        precio: req.body.precio,
    });
    nuevoLibro.save().then(resultado => {
        res.status(200).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error añadiendo libro"});
    });
});

// Añade el servicio PUT para modificar un libro por su id
router.put("/libros/:id", (req, res) => {
    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio
        }
    }, {new: true}).then(resultado => {
        res.status(200).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error actualizando libro"});
    });
});

// Añade el servicio DELETE para borrar un libro por su id
router.delete("/libros/:id", (req, res) => {
    Libro.findByIdAndDelete(req.params.id).then(resultado => {
        if (resultado) {
            res.status(200).send({ok: true, resultado: resultado}); 
        } else {
            res.status(400).send({ok: false, error: "No se ha encontrado el contacto"});
        }
        
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error eliminando libro"});
    });
});

module.exports = router;