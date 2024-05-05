import fs from "node:fs/promises";
import path from "node:path";
import connection from "./DataBase.js";
import ItemDB from "./ItemDB.js";


export default class Tabla {
  constructor(nombre) {
    this.nombre = nombre;
    this._conexion = connection;
  }

  async getAll() {
    const sql = `SELECT * FROM ${this.nombre}`;
    const resultado = await this._conexion.query(sql);
    console.log("resultado del metodo GETALL: ",resultado.status);
    return resultado.result;
  }

  async getById(id) {
    const sql = `SELECT * FROM ${this.nombre} WHERE id = ?`;
    const resultado = await this._conexion.query(sql,id);
    console.log("resultado del metodo GETBYID: ",resultado.status);

    return resultado.result;
  }

  async add(datos) {
    const campos = Object.keys(datos);
    const valores = Object.values(datos);
    
    const sql = `INSERT INTO ${this.nombre}(${campos.join(", ")}) VALUES (?)`;
    const item = new ItemDB(datos)
    const resultado = await this._conexion.query(sql,valores);
    console.log("resultado del metodo ADD: ",resultado.status);

    return resultado.result;
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
    } catch (error) {
      console.log("error del metodo UPDATE: ")
      return error.message
    }
  }

  async search(campo, valor) {
    const sql = `SELECT * FROM ${this.nombre} WHERE ${campo}=?`;
    const resultado = await this._conexion.query(sql,valor);
    console.log("resultado del metodo SEARCH: ",resultado.status);
    return resultado.result;
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.nombre} WHERE id = ?` ;
    const resultado = await this._conexion.query(sql,id);
    console.log("resultado del metodo DELETE: ",resultado.status);

    return resultado.result;
  }
}



