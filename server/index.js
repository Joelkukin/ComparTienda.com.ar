// Import Dependencias
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

// Import Routes
import index from"./routes/index.js"
//import auth from "./routes/auth.js";

// Inicio del server
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rutas de la aplicación
//app.use(auth);
app.use(index);

//Ejecutamos el servidor
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('Server is in port', PORT);
});