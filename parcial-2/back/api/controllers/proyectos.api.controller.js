import * as service from "../../services/proyectos.services.js"

export function getProyectos(req, res) {
    service.getProyectos()
        .then(proyectos => res.status(200).json(proyectos))
}

export function crearProyecto(req, res) {
    service.crearProyecto(req.body, req.session.id)
        .then(nuevoProyecto => res.status(200).json(nuevoProyecto))
        .catch(err => res.status(500).json({ message: err }))
}

export function borrarProyecto(req, res) {
    const id = req.params.id
    service.borrarProyecto(id)
        .then(() => res.status(200).json({ message: "Proyecto eliminado correctamente." }))
        .catch((err) => res.status(500).json({ message: "El proyecto NO se ah podido eliminar." }))
}

