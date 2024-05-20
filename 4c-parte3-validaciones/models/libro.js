const mongoose = require("mongoose");

let comentarioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    nick: {
        type: String,
        required: true,
        trim: true
    },
    comentario: {
        type: String,
        required: true
    }
});

let libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "El título del libro es obligatorio"],
        minlength: [3, "El nombre del libro es demasiado corto"],
        trim: true
    },
    editorial: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: [true, "El precio del libro es obligatorio"],
        min: 0,
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores"
    },
    portada: {
        type: String,
        trim: true
    },
    comentarios: [comentarioSchema]
});

let Libro = mongoose.model("libros", libroSchema);
module.exports = Libro;