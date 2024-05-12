
// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");

// Enrutador
const router = express.Router();

// Incorpora los modelos de datos
const Usuario = require(__dirname + "/../models/usuario.js");

router.get("/registro", (req, res) => {
    Usuario.find()
    .then(resultado => {
        res.status(200).send({ok:true, resultado: resultado});
    }).catch(error => {
        res.status(500).send({ok: false, error: "Error obteniendo usuarios"});
    });
});

// Añade el servicio POST para insertar un nuevo libro
router.post("/registro", (req, res) => {
    let nuevoUsuario = new Usuario({
        login: req.body.login,
        password: req.body.password,
    });
    nuevoUsuario.save().then(resultado => {
        res.status(200).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error añadiendo usuario"});
    });
});

module.exports = router;