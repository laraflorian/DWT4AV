import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"
import { validarId, validarProducto } from "../../middlewares/productos.validacion.js"
import { validarToken } from "../../middlewares/token.validacion.js"

const router = express.Router()

router.get("/",[validarToken], controllers.getProductos)
router.get("/:id",[validarToken, validarId], controllers.getProductoPorId)
router.post("/", [validarProducto, validarToken], controllers.crearProducto)
router.delete("/:id",[validarToken, validarId], controllers.borrarProducto)
router.put("/:id",[validarToken, validarId], controllers.reemplazarProducto)
router.patch("/:id",[validarToken, validarId], controllers.actualizarProducto)

export default router