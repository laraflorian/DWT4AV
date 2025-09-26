import express from "express"
import * as controllers from "../controllers/maquilladores.api.controller.js"

const router = express.Router()

router.get("/", controllers.getMaquilladores)
router.get("/:id", controllers.getMaquilladorPorId)
router.post("/", controllers.crearMaquillador)
router.delete("/:id", controllers.borrarMaquillador)
router.put("/:id", controllers.reemplazarMaquillador)
router.patch("/:id", controllers.actualizarMaquillador)

router.post("/:idMaquillador", controllers.asignarProducto)
router.get("/:idMaquillador/productos", controllers.getProductosMaquillador)


export default router