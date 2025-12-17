import express from "express"
import * as controllers from "../controllers/usuarios.api.controller.js"
import { validarUsuarios, validarLogin } from "../../middlewares/usuarios.validacion.js"
import { validarToken } from "../../middlewares/token.validacion.js"
import { upload, resizeImage } from '../../middlewares/subirAvatar.js'

const router = express.Router()

router.post("/", [validarUsuarios], controllers.createUser)
router.post("/login",[validarLogin], controllers.login)

router.get("/perfil", [validarToken], controllers.getMiPerfil)
router.put("/perfil", [validarToken], controllers.actualizarPerfil)
router.post("/perfil/avatar", [validarToken, upload.single("file"), resizeImage], controllers.actualizarAvatar)


export default router