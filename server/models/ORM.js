
import connection from "./DataBase.js";
import {arraysIguales} from "../utils/arrays.js";
import {propiedadesIncluidas} from "../utils/validaciones.js";
//import ItemDB from "./ItemDB.js";

/* quiero crear una clase que herede todo de TablaDB pero que retorne objetos de tipo ItemDB */
export class ItemDB{
  constructor(tabla, idCol,item){
    // si item es un objeto
    if (typeof item !== 'object') throw new Error("Item debe ser un objeto") 
    Object.assign(this, item)

    let id= this[idCol];
    this.update = async (newProps) => {return await tabla.update(this[idCol],newProps)}
    this.delete = async () => {return await tabla.delete(this[idCol])}
    // this.tabla = tabla
  }
/* 
  async update(newProps){
    console.log("update de itemDB: ")
    let id= this[this.idCol];
    console.log("new Props: ", newProps)
    let result = await this.tabla.update(id,newProps)
    
    return result
  }
  async delete(){
    console.log(
      await this.tabla.delete(this[this.idCol])
    )
  } */
  
}


export default class TablaDB {
  _conexion = connection;
  constructor({nombre,id,campos,foraneas}) {
    this.nombre = nombre;
    this.typeId = campos[id];
    this.idCol = id;
    this.campos = Object.keys(campos);
    this.create({nombre,id,campos,foraneas})
  }
  async create({nombre, id, campos, foraneas}) {
    try{
      // validamos los datos ingresados
      if(!nombre || !id || !campos) return {error: 'Nombre, Id y Campos deben estar definidos'};
      if (!nombre || !id || typeof campos !== "object" || (foraneas && typeof foraneas !== "object")) return {
        error: 'los parámetros deben ser de la siguiente forma: nombre = string, id = string o número, campos = objeto, foraneas(opcional) = objeto'
      };

      // transformamos el conjunto de campos en un string para poner en la consulta sql
      let strCampos = []
      for (const key in campos) {
        strCampos.push(`${key} ${campos[key]}`)
      }
      strCampos = strCampos.join(", ")

      // transformamos el conjunto de claves foraneas en un string para poner en la consulta sql
      let strForaneas = []
      for (const key in foraneas) {
        strForaneas.push(`,FOREIGN KEY (${key}) REFERENCES ${foraneas[key]}`)
      }
      strForaneas = strForaneas.join(" ")

      // ejecutamos la consulta sql
      const resp = await this._conexion.query(
        `CREATE TABLE IF NOT EXISTS ${nombre} (
          ${strCampos},
          PRIMARY KEY(${id})
          ${strForaneas}
        );`
      )
      
      // mostramos los resultados por consola y los retornamos
      let mensaje = resp.result.warningStatus?`Tabla "${nombre}" existe en la BD`:`La tabla ${nombre} ha sido creada correctamente`
      this.test = mensaje
      console.log(mensaje)
      return mensaje
    }catch(e){
      return {status:"error",result: e};
    }
    }
    async getAll() {
      try{
        const sql = `SELECT * FROM ${this.nombre}`;
        const resultado = await this._conexion.query(sql);

        console.log("resultado del metodo GETALL: ",resultado.status);

        
        return resultado.result;
      }catch(e){
        return {status:"create error",result: e};
      }
  }

  async getById(id) {
    try{
      if (typeof id !== "number") id = parseInt(id);
      const sql = `SELECT * FROM ${this.nombre} WHERE ${this.idCol} = ?`;
      const resultado = await this._conexion.query(sql,id);
      //console.log("getById.resultado.result[0]: ",resultado.result)
      if(resultado.result[0]){
        let item = new ItemDB(this,this.idCol,resultado.result[0])
        return {status:resultado.status,result: item};
      } else {
        return {status:"getById fail",result: "item no encontrado"}
      }
      
      // console.log("resultado del metodo GETBYID: ",resultado.status);
      
      /* item.update = async (sets)=>{this.update(item[this.idCol],sets)}
      item.delete = async ()=>{this.delete(item[id],item[this.idCol])} */
      
    }catch(e){
      return {status:e.code?"error "+e.code : "error",result: e.message};
    }
  }

  async search({buscar, en = this.idCol, traer = "*"}) {
    if(typeof buscar ==="object"){
      let [en] = Object.keys(buscar)
      buscar = String(buscar[en])
    }

    console.log({en, buscar, traer})
    try{
      // verificar que "en" sea igual a uno de los campos
      if (!this.campos.includes(en)) {
        throw new Error(`El campo "${en}" no existe en la tabla "${this.nombre}"`);
      }

      // Si la variable "traer" es un string o un array y si sus valores son campos de la tabla
      if (typeof traer == "string" || Array.isArray(traer)) {
        
        // Si el valor de "traer" es un string
        if (typeof traer == "string") {
          console.log('traer !== "*"',traer !== "*")
          // Si el valor de "traer" no existe en el array "this.campos"
          if (traer !== "*" && !this.campos.includes(traer)) {
            // Lanzar un error con un mensaje personalizado
            throw new Error(`El campo traer:"${traer}" no existe en la tabla "${this.nombre}"`);
          } else if(traer !== "*"){
            // En caso contrario, Encontrar el primer elemento del array "this.campos" que coincida con el valor de "traer"
            const campoCoincidente = this.campos.find(campo => campo === traer);
            // Asignar el valor de "campoCoincidente" a la variable "traer"
            traer = campoCoincidente;
          }
        }
        
        // Si la variable "traer" es un array
        if (Array.isArray(traer)) {
          
          // Crear un nuevo array "camposExtraidos" que contiene solo los elementos de "traer" que también existen en "this.campos"
          const camposExtraidos = traer.filter(campo => this.campos.includes(campo));
          
          // Asignar el valor de "camposExtraidos" a la variable "traer"
          traer = camposExtraidos;
        }
      }
      
      
      
      // let {buscar, en} = params
      if(typeof buscar !== 'string' || typeof en !== 'string') return new Error("faltan parámetros o alguno de ellos no es un string"+JSON.stringify([buscar,en]))
      
      const sql = 'SELECT '+traer+' FROM '+this.nombre+' WHERE '+en+' LIKE ?';
      const resultado = await this._conexion.query(sql,buscar);

      
      let objects = resultado.result
      
      for (let i = 0; i < objects.length; i++) {
        objects[i] = new ItemDB(this,this.idCol,objects[i]);
        
      }

      // console.log("resultado del metodo SEARCH: ",resultado.status);
          
      return objects;
    }catch(e){
      /* console.log( {status:"search error",result: e} ); */
      throw e
    }
    
    /*return resultado.result; */
  }

  async add(datos) {
    try{
      // validamos que los datos sean un objeto
      if(typeof datos !== "object") throw new Error( "Ingrese los datos de la siguiente forma: {campo1: valor1, campo2: valor2, ... }");
      
      const campos = Object.keys(datos);
      const valores = Object.values(datos);
      
      propiedadesIncluidas(datos,this)
    

      // "campos" debe ser igual que los de la base de datos 
      if (!arraysIguales(campos, this.campos)) {
        console.log(`validacion: las propiedades del objeto deben ser ${this.campos.join(", ")}`)
      }
      
      
      
      // insertamos el item con los datos indicados en los parámetros
      const sql = `INSERT INTO ${this.nombre}(${campos.join(", ")}) VALUES (?)`;
      // let {status,result:lastIndex} = await this._conexion.query(`SELECT MAX(${this.idCol}) FROM ${this.nombre}`); 
      // console.log("last index: ", lastIndex);
      
      
      //const itemCreado = await this.getById(lastIndex.result[0]["MAX(id)"])
      const resultado = await this._conexion.query(sql,valores);
      datos[this.idCol] = resultado.result.insertId
      
      //console.log("resultado del metodo ADD: ",resultado.result, datos);
      return datos;
    }catch(e){
      console.log( {status:"add error",result: e} );
      return false
    }
  }
  
  async update(id, datos) {
    try{
        
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

      const sql = `UPDATE ${this.nombre} SET ${sets} WHERE \`${this.idCol}\` = ?`;
      
      const resultado = await this._conexion.query(sql, ...values);

      // console.log("id: ",id)
      let itemModificado = await this.getById(id) ;
      
      // console.log("resultado del metodo UPDATE: ",resultado.result.affectedRows? "OK":"ERROR");
      return {status: resultado.result.affectedRows?"succesful":"fail", resultado:itemModificado.result};
    
    }catch(e){
      console.log( {status:"update error",result: e} );
      return false
    }
  }

  

  async remove(...id) {
    const sql = `DELETE FROM ${this.nombre} WHERE id IN (?)` ;
    let resultado
    if (id.length == 1 ){
      let itemABorrar = this.getById(id)
      resultado = this._conexion.query(sql,id);

      [itemABorrar, resultado ] = await Promise.all([itemABorrar,resultado])
      // console.log("resultado.result.affectedRow: ",resultado.result[0])
      if(resultado.status == "succesful"){
        // console.log("Elementos borrados: ",itemABorrar);
        return "Elementos borrados: ",itemABorrar

      }else if(resultado.status == "failed"){
        return "No se ha borrado ningun elemento"
      }
    }
  }
}



