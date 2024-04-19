import express from "express"
import { Router } from "express"

const router = Router();

router.get("/registros/getAll", (req, res) => {})
router.get("/registros/getById/:id", (req, res) => {})
router.post("/registros", (req, res) => {})
router.put("/registros", (req, res) => {})
router.delete("/registros", (req, res) => {})

export default router