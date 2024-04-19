// Import Dependencias
import bodyParser from 'body-parser'
import cors from 'cors'
import exphbs from 'express-handlebars'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url); // convierte la URL del modulo actual en un archivo de Node.
// const __dirname = dirname(__filename); // obtiene el directorio de esta ruta de archivo

// Import Routes
import index from"./routes/index.js"



// Inicio del server
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rutas de la aplicación
app.use(index);

//Ejecutamos el servidor
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('Server is in port', PORT);
});