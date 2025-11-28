import { usuariosSchema, loginSchema } from "../schemas/usuarios.js"

export async function validarUsuarios(req, res, next){
    try {
        const datosValidados = await usuariosSchema.validate(req.body, {abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}

export async function validarLogin(req, res, next){
    try {
        const datosValidados = await loginSchema.validate(req.body, {abortEarly: false, stripUnknown: true})
        req.body = datosValidados
        next()
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}