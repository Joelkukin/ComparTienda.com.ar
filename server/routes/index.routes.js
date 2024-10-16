import express from "express"

const router = express.Router()

router.get('/api/', async (req, res) => {
  
  res.status(200).send("Api Funcionando") 
})

export default router