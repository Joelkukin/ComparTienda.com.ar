import express from "express"
import conexion from '../models/DataBase.js'
import testTablaDB from "../controllers/tests/testTablaDB.js";
//import testItemDB from "../controllers/tests/testItemDB.js";
const router = express.Router()

router.get('/', async (req, res) => {
  let result = await testTablaDB();
  res.status(200).send(result)
})

export default router