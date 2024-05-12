// Librerías y ficheros necesarios para este archivo
const express = require("express");
const auth = require(__dirname + "/../auth/auth");

const Usuario = require(__dirname + "/../models/usuario.js");

// Middleware que crea manejadores de rutas modulares
const router = express.Router();

router.post("/auth/login", async (req, res) => {
    let usuario = await Usuario.findOne({ login: req.body.login, password: req.body.password }).count();
    if (usuario === 1) {
        res.send({ok: true, token: auth.generarToken(req.body.login)});
    } else {
        res.send({ok: false});
    }
});

module.exports = router;