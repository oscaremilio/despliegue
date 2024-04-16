const mongoose = require("mongoose");

let incidenciaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaFin: {
        type: Date
    }
});

let habitacionSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    tipo: {
        enum: ["individual", "doble", "familiar", "suite"]
    },
    descripcion: {
        type: String,
        required: true
    },
    ultimaLimpieza: {
        type: Date,
        required: true,
        deafult: Date.now,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
        max: 250
    },
    incidencias: [incidenciaSchema]
});

let Habitacion = mongoose.model("habitaciones", habitacionSchema);
module.exports = Habitacion;