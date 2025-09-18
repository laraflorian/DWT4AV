import express from "express"
import * as controllers from "../controllers/productos.api.controller.js"

const router = express.Router()

router.get("/", controllers.getProductos)
router.get("/:id", controllers.getProductoPorId)

export default router