import usuarios from  './models/Usuarios.js';
import conexion from './models/DataBase.js';

// LA IDEA ES EDITAR COMO INTERACTUAREMOS CON EL ORM Y LOS MODELOS
export default async function test(){
  const usuario = usuarios.getById(28)
  
    
  return usuario
}

// Cerrar la conexión
/* conexion.end(function(err) {
  if (err) {
    console.error('Hubo un error al cerrar la conexión', err);
  }
});
 */