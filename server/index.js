// Import Dependencias
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

// Import Routes
import auth from"./routes/auth.routes.js"
import indexRoutes from"./routes/index.routes.js"
import usuariosRoutes from "./routes/usuarios.routes.js"
import shortlinkRedirect from "./routes/shortlink.routes.js"

//import auth from "./routes/auth.js";

// Inicio del server
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rutas de la aplicación
app.use(auth);
app.use(indexRoutes);
// app.use(usuariosRoutes);
app.use(shortlinkRedirect);

//Ejecutamos el servidor
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('Server is in port', PORT);
});