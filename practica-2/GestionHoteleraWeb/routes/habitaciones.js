/* 
Fichero que contiene el enrutador para las URIs 
que comiencen por "/habitaciones"
*/

// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");
const multer = require("multer");

// Enrutador
const router = express.Router();

// Expresión regular para asegurar la carpeta se añade la imagen subida
const regex_incidencia = /^incidencia_.+/;
const regex_habitacion = /^habitacion_.+/;

// Configura los parámetros de subida de archivos y almacenamiento
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (regex_incidencia.test(file.originalname)) {
            cb(null, 'public/uploads/incidencias')
        }
        if (regex_habitacion.test(file.originalname)) {
            cb(null, 'public/uploads/habitaciones')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// El middleware multer hace uso del almacenamiento
let upload = multer({ storage: storage });

// Incorpora los modelos de datos
// Añade limpieza.js para el servicio put("/habitaciones/:id/ultimalimpieza"
const Habitacion = require(__dirname + "/../models/habitacion.js");
const Limpieza = require(__dirname + "/../models/limpieza.js");

// Obtiene el listado completo de todas las habitaciones del hotel
router.get("/habitaciones", (req, res) => {
    Habitacion.find()
        .populate("incidencias")
        .sort("numero")
        .then( resultado => {
            res.render("habitaciones_listado", {habitaciones: resultado});
    }).catch(error => {
        res.render("error", {error: "No hay habitaciones registradas en la aplicación"});
    });
});

// Crea un servicio GET que renderiza el formulario que crea una habitación
router.get("/habitaciones/nueva", (req, res)=> {
    res.render("habitaciones_nueva");
});

// Obtiene los detalles de una habitación concreta por su id
router.get("/habitaciones/:id", (req, res) => {
    Habitacion.findById(req.params.id).then(resultado => {
        if (resultado) {
            res.render("habitaciones_ficha", {habitacion: resultado}); 
        } else {
            res.render("error", {error: "Habitacion no encontrada"});
        }
    }).catch(error => {
        res.render("error", {error: "No existe el número de la habitación"});
    });
});

// Añade una habitación al listado
router.post("/habitaciones", upload.single("imagen"), async (req, res) => {
    let habitacionExiste = await Habitacion.findOne({numero: req.body.numero});
    if (habitacionExiste) {
        let errores = {general: "Ya existe una habitación con este número"};
            res.render("habitaciones_nueva", {errores: errores, datos: req.body});
        console.log(habitacionExiste);
    } else {
        let imagen = req.file ? req.file.filename : "";
        let nuevaHabitacion = new Habitacion({
            numero: req.body.numero,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            ultimaLimpieza: req.body.ultimaLimpieza,
            precio: req.body.precio,
            imagen: imagen
        });
        nuevaHabitacion.save().then(resultado => {
            res.redirect("/habitaciones");
        }).catch(error => {
            let errores = {
                general: "Error insertando habitación"
            };
            if(error.errors.numero) {
                errores.numero = error.errors.numero.message;
            }
            if(error.errors.tipo) {
                errores.tipo = error.errors.tipo.message;
            }
            if(error.errors.descripcion) {
                errores.descripcion = error.errors.descripcion.message;
            }
            if(error.errors.precio) {
                errores.precio = error.errors.precio.message;
            }
            res.render("habitaciones_nueva", {errores: errores, datos: req.body});

        });
    }
});

// Actualiza los datos de una habitación
router.put("/habitaciones/:id", (req, res) => {

    Habitacion.findByIdAndUpdate(req.params.id, {
        $set: {
            numero: req.body.numero,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            ultimaLimpieza: req.body.ultimaLimpieza,
            precio: req.body.precio
        }
    }, { new: true, runValidators: true}).then(resultado => {
        if (resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(400).send({ ok: false, error: "Error actualizando los datos de la habitación" });
        }
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error actualizando los datos de la habitación"
            });
    });
});

// Elimina una habitación
router.delete("/habitaciones/:id", (req, res) => {

    Habitacion.findByIdAndDelete(req.params.id)
        .then(resultado => {
            if (resultado) {
                res.status(200).send({ ok: true, resultado: resultado });
            } else {
                res.status(400).send({ ok: false, error: "Error eliminando la habitación" });
            }
        }).catch(error => {
            res.status(400)
                .send({
                    ok: false,
                    error: "Error eliminando la habitación"
                });
        });
});

// Añade una incidencia en una habitación
router.post("/habitaciones/:id/incidencias", upload.single("imagen"), async (req, res) => {

    let habitacion = await Habitacion.findById(req.params.id);
    let imagen = req.file ? req.file.filename : "";
    let fechaFin = "";
    habitacion.incidencias.push({descripcion: req.body.descripcionIncidencia, fechaFin: fechaFin, imagen: imagen});
    await habitacion.save().then( resultado => {
        res.render("habitaciones_ficha", {habitacion: resultado}); 
    }).catch( error => {
        res.render("error", {error: "Error añadiendo la incidencia"});
    });
});

// Actualiza el estado de una incidencia de una habitación
router.put("/habitaciones/:idH/incidencias/:idI", async (req, res) => {
    let habitacion = await Habitacion.findById(req.params.idH);
    let incidencia = habitacion.incidencias.filter(i => i._id == req.params.idI);
    incidencia[0].fechaFin = Date.now();;
    habitacion.save().then(resultado => {
        res.render("habitaciones_ficha", {habitacion: resultado});
        //res.status(200).send({ ok: true, resultado: resultado });
    }).catch(error => {
        console.log(error);
        res.render("error", {error: "Error añadiendo la incidencia"});
        //res.status(400).send({ ok: false, error: "Incidencia no encontrada"});
    });
});

// Actualizar última limpieza
router.put("/habitaciones/:id/ultimalimpieza", async (req, res) => {
    let habitacion = await Habitacion.findById(req.params.id);
    let limpiezas = await Limpieza.find({ idHabitacion: req.params.id }).sort("-fechaHora");
    habitacion.ultimaLimpieza = limpiezas[0].fechaHora;
    habitacion.save().then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error actualizando limpieza" }) 
    });
});

module.exports = router;