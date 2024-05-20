// Librería necesaria
const mongoose = require("mongoose");

// Crea el esquema de Usuario
let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    }
});

// Exporta el modelo a la colección de usuarios
let Usuario = mongoose.model("usuarios", usuarioSchema);
module.exports = Usuario;