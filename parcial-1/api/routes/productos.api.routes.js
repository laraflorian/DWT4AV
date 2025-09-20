import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"

const router = express.Router()

router.get("/", controllers.getProductos)
router.get("/:id", controllers.getProductoPorId)
router.post("/", controllers.crearProducto)
router.delete("/:id", controllers.borrarProducto)
router.put("/:id", controllers.reemplazarProducto)
router.patch("/:id", controllers.actualizarProducto)

export default router