// Librerías y ficheros necesarios para este archivo
const express = require("express");
const auth = require(__dirname + "/../auth/auth");

// Middleware que crea manejadores de rutas modulares
const router = express.Router();

// Simulamos la base de datos
const usuarios = [
    { usuario: "nacho", password: "12345"},
    { usuario: "alex", password: "alex111"},
];

router.post("/auth/login", (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(
        (u) => u.usuario == usuario && u.password == password
    );
    if (existeUsuario.length == 1)
        res.send({ ok: true, token: auth.generarToken(existeUsuario[0].usuario)});
    else res.send({ ok: false });
});

module.exports = router;