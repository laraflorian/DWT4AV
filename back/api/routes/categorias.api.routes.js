import express from "express"
import * as controllers from "../controllers/categorias.api.controller.js"
import { validarToken } from "../../middlewares/token.validacion.js"

const router = express.Router()

router.get("/", [validarToken], controllers.getCategorias)
router.get("/:id", [validarToken], controllers.getCategoria)
router.post("/", [validarToken], controllers.crearCategoria)
router.delete("/:id", [validarToken], controllers.borrarCategoria)

export default router