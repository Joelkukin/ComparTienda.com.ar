import mysql2 from 'mysql2/promise';

const db= {
  conection : await mysql2.createConnection({
    host:process.env.DB_HOST ||  "localhost",
    user:process.env.DB_USER ||  "root",
    password:process.env.DB_PASSWORD ||  "",
    port:process.env.DB_PORT ||  "3306",
    database:process.env.DB_NAME ||  "compartienda",
  }),
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