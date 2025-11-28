import * as services from "../../services/categorias.services.js"

export function getCategorias(req, res) {
    services.getCategorias()
        .then(categorias => res.status(200).json(categorias))
}

export function getCategoria(req, res) {
    const id = req.params.id
    services.getCategoriaPorId(id)
        .then(cat => cat ? res.status(200).json(cat) : res.status(404).json({ message: "Categoria no encontrada" }))
}

export function crearCategoria(req, res) {
    services.crearCategoria(req.body)
        .then(cat => res.status(201).json(cat))
}

export function borrarCategoria(req, res) {
    const id = req.params.id
    services.borrarCategoria(id)
        .then((idBorrado) => res.status(202).json({ message: `El elemento ${idBorrado} se elimino correctamente.` }))
        .catch((err) => res.status(500).json({ message: `El elemento de id ${id} NO se elimino.` }))
}