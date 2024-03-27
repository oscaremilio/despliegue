let datos = [
    {nombre: "Nacho", telefono: "966112233", edad: 41},
    {nombre: "Ana", telefono: "911223344", edad: 36},
    {nombre: "Mario", telefono: "611998877", edad: 15},
    {nombre: "Laura", telefono: "633663366", edad: 17}
];

nuevaPersona({nombre: "Juan", telefono:"965661564", edad: 60});
nuevaPersona({nombre: "Rodolfo", telefono:"910011001", edad: 20});
// Se añade un objeto que no posee la propiedad "telefono"
nuevaPersona({nombre: "Pedro", edad: 20}); 

borrarPersona("910011001");

console.log(datos);

function nuevaPersona(persona) {
    // Si no existe la propiedad se añade un teléfono por defecto
    if (persona.telefono === undefined) {
        persona.telefono = "000000000"
    }
    datos.push(persona);
}

function borrarPersona(telefonoABuscar) {
    // Filtra los objetos sin el teléfono del parámetro, y lo asigna al array
    datos = datos.filter(persona => persona.telefono != telefonoABuscar);
}