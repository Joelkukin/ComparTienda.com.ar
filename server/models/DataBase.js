import mysql2 from 'mysql2/promise';
import {DB_HOST,
DB_USER,
DB_PASSWORD,
DB_PORT,
DB_NAME,
PORT} from '../config.js';

let db, conection;

try{
  conection = await mysql2.createPool({
    host:DB_HOST ,
    user:DB_USER ,
    password:DB_PASSWORD ,
    port:DB_PORT ,
    database:DB_NAME 
  })
  
  db= {
    conection,
    query: async (sql, ...params) => {
  
      try {
        const results = await db.conection.query(sql, params);
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        return {status:"succesful", result: results[0]}
      } catch (err) {
        console.error(err);
        return {query: sql, params,status:"error",code: err.errno,error: err.message};
      }
    }
  }

  let dbName = await db.query("SELECT DATABASE();")
  console.log(`Conexión a la base de datos ${JSON.stringify(dbName.result[0]["DATABASE()"])} exitosa`);
}catch(e){
  switch (e.code) {
    case "ECONNREFUSED":
      console.log( e.code,"error al conectar con la base de datos");
      break;
  
    default:
      console.log(e)
      db = {conection:undefined,query:undefined}
      break;
  }
  
}



export default db 

/* export class DBInterface{
  constructor() {
    async()=>{
      let conect = await mysql2.createConnection({
        host:process.env.DB_HOST ||  "localhost",
        user:process.env.DB_USER ||  "root",
        password:process.env.DB_PASSWORD ||  "",
        port:process.env.DB_PORT ||  "3306",
        database:process.env.DB_NAME ||  "compartienda",
      })
      return this.conection = conect
    }
    
  }
  async query(sql, ...params) {

    try {
      const results = await this.conection.query(sql, params);
      //console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
      return {status:"succesful", result: results[0]}
    } catch (err) {
      console.error(err);
      return {query: sql, params,status:"error",code: err.errno,error: err.message};
    }
  }
} */