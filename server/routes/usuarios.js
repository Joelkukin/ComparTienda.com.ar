import express from "express"
import { Router } from "express"
import Tabla from "../models/DataBase.js"
import usuarios from "../models/Usuarios.js";

const router = Router();
// ver TODOS los usuarios
router.get("/usuarios", async (req, res) => {
  let resultado = await usuarios.getAll()
  res.status(200).send(resultado)
})

// Buscar Usuario
router.post("/usuarios/search", async (req, res) => {
  //let resultado = {en:req.body.in,buscar:req.body.search}
  let resultado = await usuarios.search({en:req.body.in,buscar:req.body.search});
  console.log(resultado)
  res.status(200).send(JSON.stringify(resultado))
})

// Buscar Usuario por su id
router.post("/usuarios/:id", async (req, res) => {
  let resultado = await usuarios.getById(req.params.id)
  res.status(200).send(resultado)
})

// Crear Usuario
router.post("/usuario/crear", async (req, res) => {
  let resultado = await usuarios.add(req.body)
  res.status(200).send(resultado)
})

// modificar Usuario
router.put("/usuario/modificar", async (req, res) => {
  let resultado = await usuarios.update(1,{
  nombre:"modiffff1", partner:"modiffff", username:"modiffff"
})})

router.delete("/usuario/:id", async (req, res) => {return await usuarios.delete(req.params.id);})

export default router