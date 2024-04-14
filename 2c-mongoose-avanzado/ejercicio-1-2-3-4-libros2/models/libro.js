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
        required: true,
        minlength: 3,
        trim: true
    },
    editorial: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores"
    },
    comentarios: [comentarioSchema]
});

let Libro = mongoose.model("libros", libroSchema);
module.exports = Libro;