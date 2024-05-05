/* 
Fichero que contiene el enrutador para las URIs 
que comiencen por "/habitaciones"
*/

// Añade las librerías necesarias
const express = require("express");

const router = express.Router();

// Incorpora los modelos de datos
const Habitacion = require(__dirname + "/../models/habitacion.js");

// Obtiene el listado completo de todas las habitaciones del hotel
router.get("/habitaciones", (req, res) => {
    Habitacion.find()
        .populate("incidencias")
        .then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(500).send({ ok: false, error: "No hay habitaciones registradas en la aplicación" });
        });
});

// Obtiene los detalles de una habitación concreta por su id
router.get('/habitaciones/:id', (req, res) => {
    Habitacion.findById(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se han encontrado habitaciones"
                });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "No existe el número de habitación"
            });
    });
});

// Añade una habitación al listado
router.post('/habitaciones', (req, res) => {

    let nuevaHabitacion = new Habitacion({
        numero: req.body.numero,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        ultimaLimpieza: req.body.ultimaLimpieza,
        precio: req.body.precio
    });

    nuevaHabitacion.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error insertando la habitación"
            });
    });
});

// Actualiza los datos de una habitación
router.put('/habitaciones/:id', (req, res) => {

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
router.delete('/habitaciones/:id', (req, res) => {

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
router.post('/habitaciones/:id/incidencias', async (req, res) => {

    let habitacion = await Habitacion.findById(req.params.id);
    habitacion.incidencias.push({descripcion: req.body.descripcion});
    habitacion.save().then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error añadiendo la incidencia"});
    });
});

// Actualiza el estado de una incidencia de una habitación
router.put("/habitaciones/:idH/incidencias/:idI", async (req, res) => {
    let habitacion = await Habitacion.findById(req.params.idH);
    let incidencia = habitacion.incidencias.filter(i => i._id == req.params.idI);
    incidencia[0].fin = Date.now();
    habitacion.save().then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Incidencia no encontrada"});
    });
});
// Actualizar última limpieza
router.put("/habitaciones/:id/ultimalimpieza", async (req, res) => {
    let habitacion = await Habitacion.findById(req.params.id);
    let limpiezas = await Limpieza.find({ habitacion: req.params.id }).sort('-fechaHora');
    habitacion.ultimaLimpieza = limpiezas[0].fechaHora;
    habitacion.save().then(resultado => {
        res.status(200).send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400).send({ ok: false, error: "Error actualizando limpieza" }) 
    });
});

// Actualizar TODAS las últimas limpiezas
router.put("/habitaciones/ultimalimpieza", async (req, res) => {
    // SE PUEDE ELIMINAR Y NO ENTREGAR
    let habitacion = await Habitacion.findById(req.params.id);
    cursor = Limpieza.find();
    while (cursor.hasNext()) {
        document = cursor.next();
        res.status(200).send({ ok: true, resultado: document });
    } 
});

module.exports = router;
