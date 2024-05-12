import TablaDB from './TablaDB.js'
export default class ItemDB extends TablaDB{
  constructor(id,props){
    Object.assign(this, id);
    Object.assign(this, props);
    // comando set
    // comando get id
    this._conexion.query()
  }

  async update(id, datos) {
    try {
      let sets = []; 
      let values = [];
      let claves = Object.keys(datos);
      datos.id = id;

      for (const clave of claves) {
        sets.push(`\`${clave}\` = ?`);
        values.push(datos[clave]);
      }
      sets = sets.join(', ');
      values.push(this.id);  // Agrega el id al final del array de valores

      const sql = `UPDATE ${this.nombre} SET ${sets} WHERE \`id\` = ?`;
      
      const resultado = await this._conexion.query(sql, ...values);
      console.log("resultado del metodo UPDATE: ",resultado.status);
      
      return {sql, params: values, resultado:resultado.result};
    } 
    catch (error) {
      console.log("error del metodo update: ",error.message)
      return error.message
    }
  }
  async delete(id) {
    try {
      const sql = `DELETE FROM ${this.nombre} WHERE id = ?` ;
      const resultado = await this._conexion.query(sql,id);
      console.log("resultado del metodo DELETE: ",resultado.status);
      
      let props = Object.keys(this);
      props.forEach(key => delete this[key])

      return resultado.result;
    } 
    catch (error) {
      console.log("error del metodo delete: ",error.message)
      return error.message
    }
  } 
}