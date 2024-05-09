const express = require("express");
const auth = require(__dirname + "/../utils/auth");

const router = express.Router();

// Simulamos la base de datos
const usuarios = [
    { usuario: "nacho", password: "12345", rol: "admin" },
    { usuario: "alex", password: "alex111", rol: "editor" },
];

router.post("/login", (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(
        (u) => u.usuario == usuario && u.password == password
    );
    if (existeUsuario.length == 1)
        res.send({ ok: true, token: auth.generarToken(existeUsuario[0].usuario,
            existeUsuario[0].rol)});
    else res.send({ ok: false });
});

module.exports = router;
