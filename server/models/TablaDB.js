import fs from "node:fs/promises";
import path from "node:path";
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

    this.idCol = idCol;
    this.tabla = tabla
  }

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
  }
  
}


export default class Tabla {
  _conexion = connection;
  constructor({nombre,id,campos,foraneas}) {
    this.nombre = nombre;
    this.typeId = campos[id];
    this.idCol = id;
    this.columnas = Object.keys(campos);
    this.create({nombre,id,campos,foraneas})
  }
  async create({nombre, id, campos, foraneas}) {
    
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
  }
  async getAll() {
    const sql = `SELECT * FROM ${this.nombre}`;
    const resultado = await this._conexion.query(sql);

    // console.log("resultado del metodo GETALL: ",resultado.status);

    
    return resultado.result;
  }

  async getById(id) {
    if (typeof id !== "number") return {error: 'El ID debe ser un numero'};
    const sql = `SELECT * FROM ${this.nombre} WHERE ${this.idCol} = ?`;
    const resultado = await this._conexion.query(sql,id);

    // console.log("resultado del metodo GETBYID: ",resultado.status);

    
    let item = resultado.result[0]
    item.update = async (sets)=>{this.update(item[this.idCol],sets)}
    item.delete = async ()=>{this.delete(item[id],item[this.idCol])}
    
    return {status:resultado.status,result: item};
  }

  async search({buscar, en}) {
    if(typeof buscar !== 'string' || typeof en !== 'string') return new Error("faltan parámetros o alguno de ellos no es un string")
    
    const sql = `SELECT * FROM ${this.nombre} WHERE ${en} LIKE ?`;
    const resultado = await this._conexion.query(sql,buscar);

    
    let objects = resultado.result
    
    for (let i = 0; i < objects.length; i++) {
      objects[i] = new ItemDB(this,this.idCol,objects[i]);
      
    }

    // console.log("resultado del metodo SEARCH: ",resultado.status);
        
    return objects;
    
    /*return resultado.result; */
  }

  async add(datos) {
    // validamos que los datos sean un objeto
    if(typeof datos !== "object") throw new Error( "Ingrese los datos de la siguiente forma: {campo1: valor1, campo2: valor2, ... }");
    
    const campos = Object.keys(datos);
    const valores = Object.values(datos);
    
    propiedadesIncluidas(datos,this)
  

    // "campos" debe ser igual que los de la base de datos 
    if (!arraysIguales(campos, columnas)) {
      console.log(`validacion: las propiedades del objeto deben ser ${columnas.join(", ")}`)
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

      const sql = `UPDATE ${this.nombre} SET ${sets} WHERE \`${this.idCol}\` = ?`;
      
      const resultado = await this._conexion.query(sql, ...values);

      console.log("id: ",id)
      let itemModificado = await this.getById(id) ;
      
      // console.log("resultado del metodo UPDATE: ",resultado.result.affectedRows? "OK":"ERROR");
      return {status: resultado.result.affectedRows?"succesful":"fail", resultado:itemModificado.result};
    } catch (error) {
      console.log("error del metodo UPDATE: ")
      return error.message
    }
  }

  

  async delete(...id) {
    const sql = `DELETE FROM ${this.nombre} WHERE id IN (?)` ;
    let resultado
    if (id.length > 1 ){
      resultado = []
      const promises = id.map(async(id)=>{
        let res = await this._conexion.query(sql,[id]);
        return res.result.affectedRows?"Elemento borrado":"Elemento no encontrado";
      });
      resultado = await Promise.all(promises);
      console.log(resultado);
      return [resultado]
    } else {
      resultado = await this._conexion.query(sql,id);
      console.log("Elementos borrados: ",resultado.result.affectedRows);
      return ["Elementos borrados: ",resultado.result.affectedRows]
    }
  }
}



