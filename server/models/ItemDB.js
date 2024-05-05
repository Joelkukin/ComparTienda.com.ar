export default class ItemDB {
  constructor(props){
    Object.assign(this, props);

    async ()=>{
      const campos = Object.keys(props);
      const valores = Object.values(props);
      try {
        const sql = `INSERT INTO ${this.nombre}(${campos.join(", ")}) VALUES (?)`;
        const item = new ItemDB(props)
        const resultado = await this._conexion.query(sql,valores);

        sql = `SELECT * FROM ${this.nombre} WHERE id = ?`;
        const id = await this._conexion.query(sql,id);
        this.id = id.result;
        console.log("id ejecutado desde el contructor: ",id.status);


        console.log("creación de objeto ",resultado.status);
        
      } 
      catch (error) {
        console.log("error al crear el item: ",error.message)
        return error.message
      }
    }
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
      values.push(id);  // Agrega el id al final del array de valores

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