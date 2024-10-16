import express from "express"
import shortlinks from "../models/shortlinks.js";
import {procesarUrl} from "../utils/validaciones.js";
import { getAll, getById , crear} from "../controllers/shortlinks.controller.js";
const router = express.Router()

router.get('/api/shortlinks', getAll)

router.get('/api/shortlink/:id_shortlink', getById)

router.post('/api/shortlinks/crear', crear)

export default router