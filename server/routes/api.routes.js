import express from "express"

const router = express.Router()

router.get('/api/getAll', (req, res) => {
  res.render("index", {layout: 'main'},)
})

router.get('/api/getById/:id', (req, res) => {
  res.render("index", {layout: 'main'},)
})

export default router