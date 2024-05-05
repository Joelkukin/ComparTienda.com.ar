import express from "express"
import { Router } from "express"
import Tabla from "../models/DataBase"

const router = Router();
const users = new Tabla({id,nombre,	partner,	username,	password,	mail,	tipo})

router.get("/users/getAll", (req, res) => {})
router.get("/users/getById/:id", (req, res) => {})
router.post("/users", (req, res) => {})
router.put("/users", (req, res) => {})
router.delete("/users", (req, res) => {})

export default router