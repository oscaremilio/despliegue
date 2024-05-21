// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");
const multer = require("multer");
const auth = require(__dirname + "/../utils/auth.js");
const router = express.Router();

// Configura los parámetros de subida de archivos y almacenamiento
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage });

// Incorpora los modelos de datos
const Libro = require(__dirname + "/../models/libro.js");

// Crea un servicio GET que renderiza el listado completo de libros
router.get("/libros", (req, res) => {
        Libro.find()
        .populate("autor")
        .populate("comentarios")
        .then( resultado => {
            res.render("libros_listado", {libros: resultado});
    }).catch(error => {
        res.render("error", {error: "Error listando libros"});
    });
});

// Crea un servicio GET que renderiza el formulario que crea un libro nuevo
router.get("/libros/nuevo/libro", (req, res)=> {
    res.render("libros_nuevo");
})

// Crea un servicio GET que renderiza los datos del libro a partir de su id
router.get("/libros/:id", (req, res) => {
    Libro.findById(req.params.id)
    .populate("autor")
    .populate("comentarios")
    .then(resultado => {
        if (resultado) {
            res.render("libros_ficha", {libro: resultado}); 
        } else {
            res.render("error", {error: "Libro no encontrado"});
        }
    }).catch(error => {
        res.render("error", {error: "Error buscando libro"});
    });
});

// Añade el servicio POST para insertar un nuevo libro con datos del formulario
router.post("/libros", upload.single("portada"), (req, res) => {
    let portada = req.file ? req.file.filename : '';
    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        portada: portada,
    });
    nuevoLibro.save().then(resultado => {
        res.redirect("/libros");
    }).catch(error => {
        /* Este trozo de código comentado se puede usar si queremos que los errores aparezcan todos juntos en la plantilla error.
        En es caso aparte de este código pondríamos:
        res.render('error', {error: mensaje});
        */
        /*let errores = Object.keys(error.errors);
        let mensaje = "";
        if(errores.length > 0) {
            errores.forEach(clave => {
                mensaje += "<p>" + error.errors[clave].message + "</p>";
            });
        } else {
            mensaje = "Error añadiendo libro";
        }*/
        let errores = {
            general: 'Error insertando libros'
          };
        if(error.errors.titulo) {
            errores.titulo = error.errors.titulo.message;
        }
        if(error.errors.precio) {
            errores.precio = error.errors.precio.message;
        }
        res.render("libros_nuevo", {errores: errores, datos: req.body});
    });
});

// Añade el servicio DELETE para borrar un libro por su id
router.delete("/libros/:id", (req, res) => {
    Libro.findByIdAndDelete(req.params.id).then(resultado => {
            res.redirect("/libros"); 
        }).catch(error => {
        res.render("error", {error: "Error eliminando libro"});
    });
});

// Añade el servicio para renderizar un formulario de un libro y actualizarlo
router.get("/libros/editar/:id", (req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if (resultado) {
            res.render('libros_editar', {libro: resultado});
        } else {
            res.render('error', {error: "Libro no encontrado"});
        }
    }).catch(error => {
        res.render('error', {error: "Libro no encontrado"});
    });
});

// Añade el servicio PUT en base al formulario recibido del libro en concreto
router.post("/libros/:id", upload.single("portada"), (req, res) => {
    let portada = req.file ? req.file.filename : req.body.portada;
    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio,
            portada: portada
        }
    }, {new: true}).then(resultado => {
        res.redirect("/libros"); 
    }).catch(error => {
        res.render("error", {error: "Error modificando libro"});
    });
});

module.exports = router;