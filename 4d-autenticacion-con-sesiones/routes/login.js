const express = require("express");
const mongoose= require("mongoose");
const router = express.Router();

const usuarios = [
    {usuario: "fernando", password: "fernando12345"},
    {usuario: "oscar", password: "oscar12345"}
];

router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let existeUsuario = usuarios.filter(usuario =>
        usuario.usuario == login && usuario.password == password);
    if (existeUsuario.length > 0) {
        req.session.usuario = existeUsuario[0].usuario;
        res.render('libros_listado');
    } else {
        res.render('login',
            { error: "Usuario o contraseña incorrectos" });
    }
});

// Crea un servicio GET que renderiza el formulario que crea una habitación
router.get("/login", (req, res)=> {
    res.render("login");
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
    });

module.exports = router;