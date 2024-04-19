import fs from "node:fs/promises";
import path from "node:path";
import {createPool} from "mysql2/promise"
import { table } from "node:console";

const pool = createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME
})

export default class TablaDB{
  tabla
  constructor(tabla){
    this.tabla
  }
  // create
  static async create() {
    const [result] = await pool.query(`CREATE * FROM ${this.tabla}`)
    return result;
  }
  // read
  static async getAll(){
    const [result] = await pool.query(`SELECT * FROM ${this.tabla}`)
    return result;
  }
  static async getById(obj){
    const [result] = await pool.query(`SELECT * FROM ${this.tabla} WHERE ?`,[obj])
    return result;
  }

  // update
  static async update({id, options}){}
  // delete
  static async delete(id){}
}

export class JsonDB {
  constructor(jsonArray) {
    this.jsonArray = jsonArray;
  }

  // Obtener todos los objetos
  async getAll() {
    return this.jsonArray;
  }

  // Obtener un objeto por su ID
  async getById(id) {
    return this.jsonArray.find(obj => obj.id === id);
  }

  // Crear un nuevo objeto
  async create(newObj) {
    this.jsonArray.push(newObj);
  }

  // Actualizar un objeto por su ID
  async update(id, newProperties) {
    let obj = this.getById(id);
    if (obj) {
      // Actualizar las propiedades del objeto
      for (let prop in newProperties) {
        if (newProperties.hasOwnProperty(prop)) {
          obj[prop] = newProperties[prop];
        }
      }
    }
    return obj;
  }

  // Eliminar un objeto por su ID
  async delete(id) {
    let index = this.jsonArray.findIndex(obj => obj.id === id);
    if (index !== -1) {
      this.jsonArray.splice(index, 1);
    }
  }
}

// Uso de la clase JsonDB
let db = new JsonDB([{id: 1, name: 'Objeto 1'}, {id: 2, name: 'Objeto 2'}]);
console.log(db.getAll()); // Imprime todos los objetos
console.log(db.getById(1)); // Imprime el objeto con id 1
db.update(1, {name: 'Objeto 1 actualizado'}); // Actualiza el objeto con id 1
db.delete(2); // Elimina el objeto con id 2
console.log(db.getAll()); // Imprime todos los objetos después de las operaciones


