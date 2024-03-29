let datos = [
    {nombre: "Nacho", telefono: "966112233", edad: 41},
    {nombre: "Ana", telefono: "911223344", edad: 36},
    {nombre: "Mario", telefono: "611998877", edad: 15},
    {nombre: "Laura", telefono: "633663366", edad: 17}
];

// Visualiza el listado con los datos originales
console.log(datos);

// Promesa para insertar una nueva persona
let nuevaPersona = personaInsertada => {
    return new Promise((resolve, reject) => {
        // Filtra si hay un teléfono idéntico al de la persona a insertar 
        let resultado = datos.filter(persona => persona.telefono === personaInsertada.telefono);
        // Si no coincide el teléfono, se inserta la nueva persona
        if (resultado.length === 0) {
            datos.push(personaInsertada);
            resolve(personaInsertada);
        } else {
            reject("...Error: el teléfono ya existe. Persona no agregada");
        }
    });
};

// Promesa para borrar una persona del listado
let borrarPersona = personaABorrar => {
    return new Promise((resolve, reject) => {
        // Filtra si hay un teléfono idéntico al de la persona a borrar
        let resultado = datos.filter(persona => persona.telefono === personaABorrar);
        if (resultado.length > 0) {
            // Si existe el teléfono, borra la persona indicada
            datos = datos.filter(personaListado => personaListado.telefono != personaABorrar);
            resolve(personaABorrar);
        }
        else {
            reject("...Error: no se encontraron coincidencias");
        }
    });
};

// Ejecuta la Promesa
borrarPersona("966112233").then(
    resultado => { // El resultado es correcto
        console.log("...Persona borrada: ", resultado);
}).catch(error => {
    console.log(error);
});

// Esta Promesa ejecuta el error porque no existe en el listado
borrarPersona("611998871").then(
    resultado => {
        console.log("...Persona borrada: ", resultado);
}).catch(error => { 
    console.log(error);
});

// Se añade la nueva persona al listado
nuevaPersona({nombre: "Alberto", telefono:"611998844", edad: 60}).then(
    resultado => {
        console.log("...Nueva persona introducida: ", resultado);
}).catch(error => {
    console.log(error);
});

// El teléfono ya existe en el listado, por lo que se ejecuta el error
nuevaPersona({nombre: "Laura", telefono:"633663366", edad: 17}).then(
    resultado => {
        console.log("...Nueva persona introducida: ", resultado);
}).catch(error => {
    console.log(error);
});

// Visualizamos el listado definitivo tras los cambios
setTimeout(() => {
    console.log(datos);
}, 1000);