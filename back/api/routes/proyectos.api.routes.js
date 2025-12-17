import express from "express"
import * as controllers from "../controllers/proyectos.api.controller.js"
import { validarToken } from "../../middlewares/token.validacion.js"

const router = express.Router()

router.get("/", [validarToken], controllers.getProyectos)
router.get("/mios", [validarToken], controllers.getMisProyectos)
router.get("/:id",[validarToken], controllers.getProyectoPorId)
router.post("/", [validarToken], controllers.crearProyecto)
router.put("/:id", [validarToken], controllers.editarProyecto)

router.post("/:id/colaboradores", [validarToken], controllers.agregarColaboradores)
router.delete("/:id/colaboradores/:uid", [validarToken], controllers.eliminarColaborador)

router.delete("/:id", [validarToken], controllers.borrarProyecto)

export default router
