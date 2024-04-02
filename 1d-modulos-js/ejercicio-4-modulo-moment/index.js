const moment = require("moment");

let actual = moment();
let anterior = moment("07/10/2015", "DD/MM/YYYY");
let posterior = moment("05/04/2027", "DD/MM/YYYY");
let actualPosteriorUnMes = actual.add(1, "M").format("DD/MM/YYYY");

console.log("Hoy es", actual.format("DD/MM/YYYY"));
console.log("Una fecha anterior a hoy es", anterior.format("DD/MM/YYYY"));
console.log("Una fecha posterior a hoy es", posterior.format("DD/MM/YYYY"));

console.log("Los años transcurridos entre la fecha actual y la anterior es de", moment.duration(actual.diff(anterior)).years(), "años");
console.log("Entre la fecha posterior y la fecha actual habrán pasado", moment.duration(posterior.diff(actual)).years(), "años y", moment.duration(posterior.diff(actual)).months(), "meses");

if (anterior.isBefore(actual)) {
    console.log("La fecha", anterior.format("DD/MM/YYYY"),  "es efectivamente anterior a", actual.format("DD/MM/YYYY"));
}

if (actual.isAfter(anterior)) {
    console.log("La fecha", actual.format("DD/MM/YYYY"),  "es efectivamente posterior a", anterior.format("DD/MM/YYYY"));
}

console.log("En un mes la fecha será", actualPosteriorUnMes);