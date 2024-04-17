// Añade las librerías necesarias
const express = require("express");
const os = require("os");

// Crea una instancia de Express
let app = express();

// Crea un servicio para la ruta "/fecha"
app.get('/fecha', (req, res) => {
    res.send("Fecha y hora actuales: " + " " + Date().toLocaleString());
});

// Crea un servicio para la ruta "/usuario"
app.get('/usuario', (req, res) => {
    let user = os.userInfo().username;
    res.send("Usuario que entró al sistema:" + " " + user.toLocaleUpperCase());
});

// Se pone a escuchar por el puerto 8080
app.listen(8080);