// Se incluye el módulo "os" de la API de Node 
const os = require("os");
// Averigua el usuario del Sistema Operativo
const user = os.userInfo().username;

console.log("Hola", user.toLocaleUpperCase());