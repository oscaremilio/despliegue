// Añade la librería necesaria
const mongoose = require("mongoose");

// Esquema para registrar las incidencias que se produzcan en la habitación
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

// Esquema y modelo para la colección de habitaciones del hotel
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
    }, // Subdocumento del modelo habitaciones
    incidencias: [incidenciaSchema]
});

// Guarda el esquema en el modelo y crea la colección 
let Habitacion = mongoose.model("habitaciones", habitacionSchema);

// Exporta el contenido para el resto de archivos del proyecto
module.exports = Habitacion;