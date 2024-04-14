const mongoose= require("mongoose");
const Autor = require("./models/autor");
const Libro = require(__dirname + "/models/libro");

mongoose.connect("mongodb://127.0.0.1:27017/libros2");

//---Código de la primera versión de Libros realizada en el pdf 2b

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
/*
Libro.find({precio:{$gte:10, $lte: 20}}).then( resultado => {
    console.log("Resultado de la búsqueda:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
*/

// Búsqueda por "id"
/*
Libro.findById("660d7c7b44b2a853b838d2de").then(resultado => {
    console.log("Resultado de la búsqueda:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
*/

// Borra un libro de la colección gracias a su id y muestra los datos borrados
/*
Libro.findByIdAndDelete("660d7c7b44b2a853b838d2de").then(resultado => {
    console.log("Contacto eliminado", resultado);
}).catch(error => {
    console.log("ERROR", error);
});
*/

// Modifica el precio de un libro cconociendo su id, incrementa su versión
/*
Libro.findByIdAndUpdate("660d7c7b44b2a853b838d2dd", 
    {$set: {precio: 69}, 
    $inc: {__v: 1}}, 
    {new: true, runValidators: true}).then(resultado => {
        console.log("Modificado contacto", resultado);
}).catch(error => {
    console.log("ERROR", error);
});
*/
// --- Fin del código de la primera versión de libros del pdf 2b

// Añade dos sutores y lo graba
/*
let autor1 = new Autor({
    nombre: "Frank Herbert",
    nacimiento: 1920
});

autor1.save().then(
    resultado => {
        console.log("Autor añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo autor:", error)
});

let autor2 = new Autor({
    nombre: "Robert Heinlein",
    nacimiento: 1907
});

autor2.save().then(
    resultado => {
        console.log("Autor añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo autor:", error)
});
*/

// Añade dos libros (ahora con el auto) y los graba
/*
let libro1= new Libro({
    titulo: "Dune",
    editorial: "Alfaguara",
    precio: 15,
    autor: "6618080a9a3fd9aea2418308"
});
libro1.save().then(
    resultado => {
        console.log("Libro añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo contacto:", error)
});

let libro2 = new Libro({
    titulo: "Forastero en tierra extraña",
    editorial: "Planeta",
    precio: 22,
    autor: "6618080a9a3fd9aea2418309"
});
libro2.save().then(
    resultado => {
        console.log("Libro añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo contacto:", error)
});
*/

let libro1 = new Libro({
    titulo: "El Mesías de Dune",
    editorial: "Planeta",
    precio: 24,
    autor: "6618080a9a3fd9aea2418308",
});
libro1.comentarios.push({
    nick: "MaestroCiego",
    comentario: "Una segunda parte muy interesante"
});
libro1.comentarios.push({
    nick: "La Botella de Kandor",
    comentario: "Una segunda parte aceptable"
});

libro1.save().then(
    resultado => {
        console.log("Libro añadido:", resultado)
}).catch(
    error => {
        console.log("ERROR añadiendo contacto:", error)
});