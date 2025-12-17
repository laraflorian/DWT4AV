import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"
import { validarId, validarProducto } from "../../middlewares/productos.validacion.js"
import { validarToken } from "../../middlewares/token.validacion.js"
import { esAdmin } from "../../middlewares/esAdmin.js"

const router = express.Router()

router.get("/",[validarToken], controllers.getProductos)
router.get("/:id",[validarToken, validarId], controllers.getProductoPorId)
router.post("/", [validarProducto, validarToken, esAdmin], controllers.crearProducto)
router.delete("/:id",[validarToken, validarId, esAdmin], controllers.borrarProducto)
router.put("/:id",[validarToken, validarId, esAdmin], controllers.reemplazarProducto)
router.patch("/:id",[validarToken, validarId, esAdmin], controllers.actualizarProducto)

export default router