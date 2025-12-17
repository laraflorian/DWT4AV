import * as service from "../../services/proyectos.services.js"

export function getProyectos(req, res) {
    service.getProyectos()
        .then(proyectos => res.status(200).json(proyectos))
}

export function crearProyecto(req, res) {
    service.crearProyecto(req.body, req.session._id)
        .then(nuevoProyecto => res.status(200).json(nuevoProyecto))
        .catch(err => res.status(500).json({ message: err }))
}

export function getProyectoPorId(req, res) {
    const id = req.params.id

    service.getProyectoPorId(id)
        .then(proyecto => {
            console.log(proyecto)
            if (!proyecto) {
                return res.status(404).json({ message: "Proyecto no encontrado." })
            }
            res.status(200).json(proyecto)
        })
        .catch(err => res.status(500).json({ message: err.message }))
}

export function editarProyecto(req, res) {
    service.editarProyecto(
        req.params.id,
        req.body,
        req.session._id,
        req.session.role
    )
        .then(proyect => res.status(200).json(proyect))
        .catch(err => res.status(500).json({ message: err.message }))
}

export function borrarProyecto(req, res) {
    const id = req.params.id

    service.borrarProyecto(
        id,
        req.session._id,
        req.session.role
    )
        .then(() => res.status(200).json({ message: "Proyecto eliminado correctamente." }))
        .catch((err) => res.status(500).json({ message: "El proyecto NO se ah podido eliminar." }))
}


export function agregarColaboradores(req, res) {
    const proyectoId = req.params.id
    const { email } = req.body
    const userId = req.session._id

    service.agregarColaboradores(proyectoId, email, userId)
        .then(proyecto => res.status(200).json(proyecto))
        .catch(err => res.status(400).json({ message: err.message }))
}

export function eliminarColaborador(req, res) {
    const proyectoId = req.params.id
    const usuarioId = req.params.uid
    const userId = req.session._id

    service.eliminarColaboradores(proyectoId, usuarioId, userId)
        .then(proyecto => res.status(200).json(proyecto))
        .catch(err => res.status(400).json({ message: err.message }))
}

export function getMisProyectos(req, res) {
    service.getMisProyectos(req.session._id)
        .then(proyectos => res.status(200).json(proyectos))
        .catch(err => res.status(400).json({ message: err.message }))
}
