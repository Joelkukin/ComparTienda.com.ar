import TablaDB from  '../../models/TablaDB.js';
import conexion from "../../models/DataBase.js";

const usuarios = new TablaDB( 'users');

export default async function test(){
    const usuarios = new TablaDB("usuarios");
    
    let _getAll = await usuarios.getAll();
    let _getById = await usuarios.getById(1);
    let _add = await usuarios.add({
      nombre:"test", partner:"test1", username:"test1", password:"test1", mail:"test1@test1", tipo:"test1"
    });
    let _update = await usuarios.update(1,{
      nombre:"modiffff1", partner:"modiffff", username:"modiffff"
    });
    let _search = await usuarios.search("nombre","test");
    let lastIndex = await conexion.query('SELECT MAX(id) FROM usuarios');
    
    let _delete = await usuarios.delete(lastIndex.result[0]["MAX(id)"]);
    const metodo = ['GetAll', 'GetById', 'Add', 'Update', 'Delete'];
    const resultados = {_search, _getById, _add, _update, lastIndex: lastIndex.result[0]["MAX(id)"], _delete,_getAll};
    
    //resultados.forEach((resultado,i)=> console.log(metodo[i], resultado))
    
    return resultados
}

// Cerrar la conexión
/* conexion.end(function(err) {
  if (err) {
    console.error('Hubo un error al cerrar la conexión', err);
  }
});
 */