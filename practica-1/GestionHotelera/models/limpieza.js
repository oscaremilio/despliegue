// Añade la librería necesaria
const mongoose = require("mongoose");

// Esquema con la información de las limpieza realizada en la habitación
let limpiezaSchema = new mongoose.Schema({
    idHabitacion: { // Informa del id de la habitación correspondiente
        type: mongoose.Schema.Types.ObjectId,
        ref: "habitaciones"
    },
    fechaHora: {
        type: Date,
        required: true,
        default: Date.now
    },
    observaciones: {
        type: String,
    }
});

// Esquema y modelo para la colección de limpiezas de las habitaciones
let Limpieza = mongoose.model("limpiezas", limpiezaSchema);

// Exporta el contenido para el resto de archivos del proyecto
module.exports = Limpieza;