import express from "express"
import * as controllers from "../controllers/proyectos.api.controller.js"
import { validarToken } from "../../middlewares/token.validacion.js"

const router = express.Router()

router.get("/", [validarToken], controllers.getProyectos)
router.post("/", [validarToken], controllers.crearProyecto)
router.delete("/:id", [validarToken], controllers.borrarProyecto)

export default router
