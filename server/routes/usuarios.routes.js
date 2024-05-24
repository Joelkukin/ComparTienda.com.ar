import express from "express"
import { Router } from "express"
import Tabla from "../models/DataBase.js"
//import usuarios from "../models/Usuarios.js";
import usuariosCtrller from "../controllers/usuarios.controller.js";

const router = Router();
// ver TODOS los usuarios
router.get("/usuarios", async (req, res) => {
  let resultado = await usuariosCtrller.getAll()
  res.status(200).json(resultado)
})

// Buscar Usuario
router.get("/usuarios/:en=:buscar/:traer?", async (req, res) => {
  const params = {en:req.params.en,buscar:req.params.buscar, traer: req.params.traer || null}
  // res.status(200).send(JSON.stringify(params))
  //let resultado = {en:req.body.in,buscar:req.body.search}
  let resultado = await usuariosCtrller.search(params);
  
  res.status(200).json(resultado)
})

// Crear Usuario
router.post("/usuarios/crear", async (req, res) => {
  let resultado = await usuariosCtrller.add(req.body)
  res.status(200).json(resultado)
})

// Buscar Usuario por su id
router.get("/usuario/:id", async (req, res) => {
  let resultado = await usuariosCtrller.getById(req.params.id)
  res.status(200).json(resultado)
})

// modificar Usuario
router.put("/usuario/:id/modificar", async (req, res) => {
  let resultado = await usuariosCtrller.update(req.params.id,req.body)
  res.status(200).json(resultado)
})

router.delete("/usuario/:id/eliminar", async (req, res) => {
  let resultado = await usuariosCtrller.remove(req.params.id);  
  res.status(200).json(resultado) 
})

export default router