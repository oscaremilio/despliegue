// Promesa para insertar una nueva persona
let nuevaPersona = (vectorPersonas, personaInsertada) => {
    return new Promise((resolve, reject) => {
        // Filtra si hay un teléfono idéntico al de la persona a insertar 
        let resultado = vectorPersonas.filter(persona => persona.telefono === personaInsertada.telefono);
        // Si no coincide el teléfono, se inserta la nueva persona
        if (resultado.length === 0) {
            vectorPersonas.push(personaInsertada);
            resolve(personaInsertada);
        } else {
            reject("...Error: el teléfono ya existe. Persona no agregada");
        }
    });
};

// Promesa para borrar una persona del listado
let borrarPersona = (vectorPersonas, personaABorrar) => {
    return new Promise((resolve, reject) => {
        // Filtra si hay un teléfono idéntico al de la persona a borrar
        let resultado = vectorPersonas.filter(persona => persona.telefono === personaABorrar);
        if (resultado.length > 0) {
            // Si existe el teléfono, borra la persona indicada
            vectorPersonas = vectorPersonas.filter(personaListado => personaListado.telefono != personaABorrar);
            resolve(personaABorrar);
        }
        else {
            reject("...Error: no se encontraron coincidencias");
        }
    });
};

module.exports = {
    nuevaPersona: nuevaPersona,
    borrarPersona: borrarPersona
};