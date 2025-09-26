import { json } from "express"
import * as services from "../../services/maquilladores.services.js"

export function getMaquilladores(req, res) {
    services.getMaquilladores(req.query)
        .then(maquillador => res.status(200).json(maquillador))
}

export function getMaquilladorPorId(req, res) {
    const id = req.params.id
    services.getMaquilladorPorId(id)
        .then(maquillador => {
            if (maquillador) {
                res.status(200).json(maquillador)
            } else {
                res.status(404).json({ message: "Elemento no encontrado" })
            }
        })
}

export function crearMaquillador(req, res) {

    services.guardarMaquillador(req.body)
        .then((nuevoMaquillador) => res.status(201).json(nuevoMaquillador))
        .catch(err => res.status(500).json({ message: err }))
}

export function borrarMaquillador(req, res) {
    const id = req.params.id
    services.borrarMaquillador(id)
        .then((idBorrado) => res.status(202).json({ message: `El elemento ${idBorrado} se elimino correctamente.` }))
        .catch((err) => res.status(500).json({ message: `El elemento de id ${id} NO se elimino.` }))
}

export function reemplazarMaquillador(req, res) {
    const id = req.params.id
    services.editarMaquillador(req.body, id)
        .then(maquilladorEditado => res.status(202).json(maquilladorEditado))
        .catch(err => res.status(500).json({ message: "No se pudo actualizar el elemento." }))
}

export function actualizarMaquillador(req, res) {
    const id = req.params.id
    services.actualizarMaquillador(req.body, id)
        .then(maquilladorEditado => res.status(202).json(maquilladorEditado))
        .catch( err => res.status(500).json({message: "No se pudo actualizar el elemento, intente en otro momento."}))
}

export function asignarProducto(req, res){
    const idMaquillador = req.params.idMaquillador
    const idProducto = req.body.idProducto
    // console.log("idMaquillador", idMaquillador)
    // console.log("idProducto", idProducto)

    services.asignarProducto(req.params.idMaquillador, req.body.idProducto)
        .then( (productos) => res.status(202).json(productos) )
        .catch( err => res.status(500).json({ message: "No se pudo asignar el producto"}))
}

export function getProductosMaquillador(req, res){
    const id = req.params.idMaquillador
    services.getProductosMaquillador(id)
        .then((productos)=> res.status(202).json(productos))
        .catch( err => res.status(500),json({message:"No se pudo obtener los productos del maquillador"}))
}