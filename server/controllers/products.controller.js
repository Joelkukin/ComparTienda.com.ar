import express from "express"
import { Router } from "express"
import {}
import {ProductoModel} from "../models/productos.js";


const router = Router();

router.get("/productos/getAll", (req, res) => {})
router.get("/productos/getById/:id", (req, res) => {})
router.post("/productos/", (req, res) => {})
router.put("/productos", (req, res) => {})
router.delete("/productos", (req, res) => {})

export default router