// Añade la librería necesaria
const mongoose = require("mongoose");

// Esquema para registrar las incidencias que se produzcan en la habitación
let incidenciaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, "La descripción de la incidencia es obligatoria"]
    },
    fechaInicio: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaFin: {
        type: Date
    },
    imagen: {
        type: String,
        trim: true
    }
});

// Esquema y modelo para la colección de habitaciones del hotel
let habitacionSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: [true, "El número de la habitación es obligatorio"],
        min: [1, "El número mínimo de la habitación no puede ser menor de 1"],
        max: [100, "El número máximo de la habitación no puede exceder de 100"]
    },
    tipo: {
        type: String,
        required: [true, "Es necesario indicar el tipo de la habitación"],
        enum: ["individual", "doble", "familiar", "suite"],
    },
    descripcion: {
        type: String,
        required: [true, "La descripción de la habitación es obligatoria"]
    },
    ultimaLimpieza: {
        type: Date,
        required: true,
        default: Date.now,
    },
    precio: {
        type: Number,
        required: [true, "El precio de la habitación es obligatorio"],
        min: [0, "El precio mínimo de la habitación no puede ser menor de 0"],
        max: [250, "El precio máximo de la habitación no puede exceder de 250"]
    },
    imagen: {
        type: String,
        trim: true
    },
    // Subdocumento del modelo habitaciones
    incidencias: [incidenciaSchema]
});

// Guarda el esquema en el modelo y crea la colección 
let Habitacion = mongoose.model("habitaciones", habitacionSchema);

// Exporta el contenido para el resto de archivos del proyecto
module.exports = Habitacion;