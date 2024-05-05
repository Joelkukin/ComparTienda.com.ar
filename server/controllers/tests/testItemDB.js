import ItemDB from  '../../models/ItemDB.js';
import conexion from '../../models/DataBase.js';


export default async function test(){
  const usuario = new ItemDB({
    nombre:"testing item class", partner:"test2", username:"test2", password:"test2", mail:"test1@test2", tipo:"test2"
  });

    let _update = await usuario.update(1,{
      nombre:"modiffff1", partner:"modiffff", username:"modiffff"
    });
    
    let lastIndex = await conexion.query('SELECT MAX(id) FROM usuarios');
    
    let _delete = await usuario.delete(lastIndex.result[0]["MAX(id)"]);
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