import express from "express"
import * as controllers from "../controllers/comentarios.api.controller.js"
import { validarToken } from "../../middlewares/token.validacion.js"

const router = express.Router()

router.get("/:proyectoId", [validarToken], controllers.listarComentarios)
router.post("/", [validarToken], controllers.crearComentario)

export default router