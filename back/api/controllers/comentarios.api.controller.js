import * as service from "../../services/comentarios.services.js"

export function crearComentario(req, res) {
    service.crearComentario(req.body, req.session.id)
        .then(nuevoCom => res.status(201).json(nuevoCom))
        .catch(err => res.status(500).json({ message: err }))
}

export function listarComentarios(req, res) {
    const id = req.params.proyectoId
    service.getComentarios(id)
        .then( cometarios => res.status(200).json(cometarios))
        .catch( err => res.status(404).json("Error al encontrar comentarios"))
}

