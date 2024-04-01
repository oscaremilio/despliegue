const lodash = require("lodash");

let nombres = ["Steven Rogers", "Anthony Stark", "Clint Barton", "Bruce Banner", "Wanda Maximoff"];

let vengadores = lodash.join(nombres, ",");

console.log("Los Vengadores:", vengadores);