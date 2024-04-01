const lodash = require("lodash");

let nombres = ["Steve Rogers", "Anthony Stark", "Clint Barton", "Bruce Banner", "Wanda Maximoff", "Simon Williams"];

let vengadores = lodash.join(nombres, ",");

console.log("Los Vengadores:", vengadores, "...");