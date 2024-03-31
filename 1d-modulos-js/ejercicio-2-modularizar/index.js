// Añade el archivo "personas.js"
const personas = require( __dirname + "/personas.js");

let datos = [
    {nombre: "Nacho", telefono: "966112233", edad: 41},
    {nombre: "Ana", telefono: "911223344", edad: 36},
    {nombre: "Mario", telefono: "611998877", edad: 15},
    {nombre: "Laura", telefono: "633663366", edad: 17}
];

// Visualiza el listado con los datos originales
console.log(datos);

// Ejecuta la Promesa
personas.borrarPersona(datos, "966112233").then(
    resultado => { // El resultado es correcto
        console.log("...Persona borrada: ", resultado);
}).catch(error => {
    console.log(error);
});

// Esta Promesa ejecuta el error porque no existe en el listado
personas.borrarPersona(datos, "611998871").then(
    resultado => {
        console.log("...Persona borrada: ", resultado);
}).catch(error => { 
    console.log(error);
});

// Se añade la nueva persona al listado
personas.nuevaPersona(datos, {nombre: "Alberto", telefono:"611998844", edad: 60}).then(
    resultado => {
        console.log("...Nueva persona introducida: ", resultado);
}).catch(error => {
    console.log(error);
});

// El teléfono ya existe en el listado, por lo que se ejecuta el error
personas.nuevaPersona(datos, {nombre: "Laura", telefono:"633663366", edad: 17}).then(
    resultado => {
        console.log("...Nueva persona introducida: ", resultado);
}).catch(error => {
    console.log(error);
});

// Visualizamos el listado definitivo tras los cambios
setTimeout(() => {
    console.log(datos);
}, 1000);