// Archivo que gestiona la autenticación basada en tokens

// Librería necesaria
const jwt = require('jsonwebtoken');

// Palabra secreta que cifra el contenido del token
const secreto = "secretoNode";

// Función que genera un token dados un login y rol válidos del usuario
let generarToken = login => jwt.sign({ login: login }, secreto, { expiresIn: "2 hours" })

// Función que valida el token que se reciba
let validarToken = token => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) { }
}

// Función que protege una ruta si se tiene el token válido
let protegerRuta = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7);
    }
    if (validarToken(token)) {
        next();
    } else {
        res.send({ ok: false, error: "Usuario no autorizado" });
    }
}

module.exports = {
    generarToken: generarToken,
    validarToken: validarToken,
    protegerRuta: protegerRuta,
};