/* 
Fichero que contiene el enrutador para las URIs 
que comiencen por "/limpiezas"
*/

// Añade las librerías necesarias
const express = require("express");

const router = express.Router();

// Incorpora los modelos de datos
const Limpieza = require(__dirname + "/../models/limpieza.js");
const Habitacion = require(__dirname + "/../models/habitacion.js");

// Obtener limpiezas de una habitación
router.get("/limpiezas/:id", async (req, res) => {
    // Recupera los datos de la habitación con el id usado en limpiezas
    const habitacion = await Habitacion.findById(req.params.id);
    Limpieza.find({ idHabitacion: req.params.id })
        .sort('-fechaHora')
        .then(resultado => {
        if (resultado.length > 0) {
            // Coge datos de 2 colecciones y usar así el número de habitación
            res.render("limpiezas_listado", {habitacion: habitacion, limpiezas: resultado});
        } else {
            res.render("error", {error: "Limpiezas no encontradas"});
        }
    }).catch(error => {
        res.render("error", {error: "No hay limpiezas registradas para esa habitación"});
    });
});

// Obtener el estado de limpieza actual de una habitación
router.get("/limpiezas/:id/estadolimpieza", async (req, res) => {
    let limpieza = await Limpieza.find({ idHabitacion: req.params.id }).sort('-fechaHora');

    let estado = "limpia";
    try {
        if (limpieza.length === 0) {
            estado = "pendiente de limpieza";
        } else {
            let fecha = limpieza[0].fechaHora;
            let hoy = new Date();
            if (fecha.getFullYear() !== hoy.getFullYear() ||
                fecha.getMonth() !== hoy.getMonth() ||
                fecha.getDate() !== hoy.getDate()) {
                estado = "pendiente de limpieza";
            }
        }
        res.status(200).send({ resultado: estado });
    } catch (err) {
        res.status(400).send({ error: "Error obteniendo estado de limpieza" });
    }

});

// Actualizar limpieza
router.post("/limpiezas/:id", async (req, res) => {
    let nuevaLimpieza = new Limpieza({
        idHabitacion: req.params.id,
        observaciones: req.body.observaciones
    });

    nuevaLimpieza.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error actualizando limpieza"
            });
    });
});

module.exports = router;