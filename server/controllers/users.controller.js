import express from "express"
import { Router } from "express"

const router = Router();

router.get("/users/getAll", (req, res) => {})
router.get("/users/getById/:id", (req, res) => {})
router.post("/users", (req, res) => {})
router.put("/users", (req, res) => {})
router.delete("/users", (req, res) => {})

export default router