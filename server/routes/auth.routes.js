import {Router} from "express"
import {login, register} from "../controllers/auth.controller.js"


const router = Router()

// "register" retorna true o false segun si se registró bien el usuario o no
router.post('/register', /* async (req, res, next)=>console.log(req.body) */register)

// "login retorna true o false segun si encontró o no el usuario"
router.post('/login', /* async (req, res, next)=>console.log(req.body) */login)

export default router