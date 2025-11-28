import * as tokenServices from '../services/token.service.js'

export async function validarToken(req, res, next) {

    try {
        const auth = req.headers["authorization"]
        if (!auth) return res.status(401).json({ message: "Token no encontrado." })

        const [bearer, token] = auth.split(" ")

        if (bearer != "Bearer" && !token) return res.status(401).json({ message: "Formato de token invalido." })

        const usuario = await tokenServices.validarToken(token)

        if (!usuario) return res.status(401).json({ message: "Token invalido." })

        req.session = usuario
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }

}