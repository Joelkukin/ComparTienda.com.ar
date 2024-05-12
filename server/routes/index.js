import express from "express"
import conexion from '../models/DataBase.js'
import test from "../tests/testTablaDB.js";

const router = express.Router()

router.get('/', async (req, res) => {
  
  res.status(200).send("Api Funcionando") 
})

export default router