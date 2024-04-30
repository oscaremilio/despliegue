/* 
Fichero que contiene el enrutador para las URIs 
que comiencen por "/limpiezas"
*/

// Añade las librerías necesarias
const express = require("express");

const router = express.Router();

// Incorpora los modelos de datos
const Limpieza = require(__dirname + "./models/limpieza.js");

// Obtener limpiezas de una habitación
router.get("/limpiezas/:id", (req, res) => {
    Limpieza.find()
    .then(resultado => {
            res.status(200).send({ok:true, resultado: resultado});
    }).catch(error => {
        res.status(500).send({ok: false, error: "No hay limpiezas registradas para esa habitación"});
    });
});

// Obtener el estado de limpieza actual de una habitación
router.get("/limpiezas/:id/estadolimpieza", (req, res) => {
    // TODO:
});

// Actualizar limpieza
router.post("/limpiezas/:id", (req, res) => {
    // TODO:
});

module.exports = router;