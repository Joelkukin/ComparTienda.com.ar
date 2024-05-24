import TablaDB from  '../models/ORM.js';
import conexion from "../models/DataBase.js";

// TESTEAMOS QUE LAS FUNCIONES CRUD FUNCIONEN CORRECTAMENTE//

export default async function test(){

  // crear //

    const usuarios = new TablaDB({
      nombre:'usuarios',
      id:"id",
      campos:{
        nombre:"VARCHAR(20)",
        partner:"VARCHAR(20)",
        username: "VARCHAR(45)",
        password: "VARCHAR(45)",
        mail: "VARCHAR(100)",
        tipo: "VARCHAR(12)",
        transacciones: "INT"
      }
    });
    
    // leer //

    let _add = await usuarios.add({
      nombre:"test", partner:"test1", username:"test1", password:"test1", mail:"test1@test1", tipo:"test1"
    });
    let _getAll = await usuarios.getAll();
    let _getById = await usuarios.getById(20);

    // Actualizar //

    let _update = await usuarios.update(1,{
      nombre:"modiffff1", partner:"modiffff", username:"modiffff"
    });
    let _search = await usuarios.search("nombre","test"); // ver datos modificados
    
    // Borrar //

    // obtener ultimo elemento creado y borrarlo
    let lastIndex = await conexion.query('SELECT MAX(id) FROM usuarios'); 
    let _delete = await usuarios.delete(230,  lastIndex.result[0]["MAX(id)"] ); // 
        
    // formatear respuesta para retornarla
    const resultados = {_search, _add, _update, lastIndex: lastIndex.result[0]["MAX(id)"], _delete,_getAll, _getById};
    return resultados
}

// Cerrar la conexión
/* conexion.end(function(err) {
  if (err) {
    console.error('Hubo un error al cerrar la conexión', err);
  }
});
 */