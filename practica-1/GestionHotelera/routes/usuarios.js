
// Añade las librerías necesarias
const express = require("express");
const mongoose= require("mongoose");

// Enrutador
const router = express.Router();

// Incorpora los modelos de datos
const Usuario = require(__dirname + "/../models/usuario.js");

/* 
Añade el servicio GET para visualizar los usuarios
Se deja para visualizar rápidamente los usuarios en Thunderclient. 
No se deja en el código porque únicamente debería poder ver los usuarios con la contraseña un administrador, y no es el tema de esta práctica.
/*
router.get("/registro", (req, res) => {
    Usuario.find()
    .then(resultado => {
        res.status(200).send({ok:true, resultado: resultado});
    }).catch(error => {
        res.status(500).send({ok: false, error: "Error obteniendo usuarios"});
    });
});
*/

/*
Se añade este servicio POST /registro para efectos prácticos a la hora de introducir los usuarios en la colección de mongoDB correspondiente.
Una mejora sería incluir roles para diferentes usuarios, administradores, usuarios normales, etc, pero no está incluido en el objetivo de la práctica.
*/
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