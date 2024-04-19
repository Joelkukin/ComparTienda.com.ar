import express from "express"
import exphbs from "express-handlebars"
import products_controller from "../controllers/products.controller.js";
import users_controller from "../controllers/users.controller.js";
import registros_controller from "../controllers/registros.controller.js";

const router = express.Router()

router.get('/api/getAll', (req, res) => {
  res.render("index", {layout: 'main'},)
})

router.get('/api/getById/:id', (req, res) => {
  res.render("index", {layout: 'main'},)
})

export default router