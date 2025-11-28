import express from "express"
import * as controllers from "../controllers/usuarios.api.controller.js"
import { validarUsuarios, validarLogin } from "../../middlewares/usuarios.validacion.js"

const router = express.Router()

router.post("/", [validarUsuarios], controllers.createUser)
router.post("/login",[validarLogin], controllers.login)


export default router