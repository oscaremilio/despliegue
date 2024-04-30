const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/test-hotel');

// Enrutadores
const habitaciones = require(__dirname + "/routes/habitaciones.js");

// Crea una instancia de Express
let app = express();

// Middleware para peticiones
app.use(express.json());

// Enrutadores para cada grupo de rutas
app.use("/habitaciones", habitaciones);

// Se pone a escuchar por el puerto 
app.listen(8080);