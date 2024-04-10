const mongoose= require("mongoose");
const Libro = require(__dirname + "/models/libro");

mongoose.connect("mongodb://127.0.0.1:27017/libros");

// Inserciones
/*
let libro1 = new Libro({
    titulo: "El capitán Alatriste",
    editorial: "Alfaguara",
    precio: 15
});
libro1.save().then(
    resultado => {
        console.log("Libro añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo contacto:", error)
});

let libro2 = new Libro({
    titulo: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95
});

libro1.save().then(
    resultado => {
        console.log("Libro añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo contacto:", error)
});
libro2.save().then(
    resultado => {
        console.log("Libro añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo contacto:", error)
});
*/

// 2 búsquedas
// Búsqueda parametrizada
Libro.find({precio:{$gte:10, $lte: 20}}).then( resultado => {
    console.log("Resultado de la búsqueda:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

// Búsqueda por "id"
Libro.findById("660d7c7b44b2a853b838d2de").then(resultado => {
    console.log("Resultado de la búsqueda:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});