import express from "express"
import exphbs from "express-handlebars"
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send("server andando")
})

export default router