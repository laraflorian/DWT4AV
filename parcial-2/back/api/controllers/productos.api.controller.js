import { ObjectId } from "mongodb"
import * as services from "../../services/productos.services.js"

export function getProductos(req, res) {
    services.getProductos(req.query)
        .then(productos => res.status(200).json(productos))
}

export function getProductoPorId(req, res) {
    const id = req.params.id
    services.getProductoPorId(id)
        .then(producto => {
            if (producto) {
                res.status(200).json(producto)
            } else {
                res.status(404).json({ message: "Elemento no encontrado" })
            }
        })
        .catch(() => res.status(500).json({ message: "Error del servidor" }))
}

export function crearProducto(req, res) {
    const producto = {
        categoria: new ObjectId(req.body.categoria),
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio,
        imagen: req.body.imagen,
        link: req.body.link
    }

    services.guardarProducto(producto)
        .then((nuevoProducto) => res.status(201).json(nuevoProducto))
        .catch(err => res.status(500).json({ message: err }))
}

export function borrarProducto(req, res) {
    const id = req.params.id
    services.borrarProducto(id)
        .then((idBorrado) => res.status(202).json({ message: `El elemento ${idBorrado} se elimino correctamente.` }))
        .catch((err) => res.status(500).json({ message: `El elemento de id ${id} NO se elimino.` }))
}

export function reemplazarProducto(req, res) {
    const id = req.params.id
    const producto = {}

    if (req.body.categoria) producto.categoria = new ObjectId(req.body.categoria)
    if (req.body.nombre) producto.nombre = req.body.nombre
    if (req.body.marca) producto.marca = req.body.marca
    if (req.body.precio) producto.precio = req.body.precio
    if (req.body.imagen) producto.imagen = req.body.imagen
    if (req.body.link) producto.link = req.body.link

    services.editarProducto(producto, id)
        .then(productoEditado => res.status(202).json(productoEditado))
        .catch(err => res.status(500).json({ message: "No se pudo actualizar el elemento." }))
}

export function actualizarProducto(req, res) {
    const id = req.params.id
    const producto = {
        _id: id,
        categoria: new ObjectId(req.body.categoria),
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio,
        imagen: req.body.imagen,
        link: req.body.link
    }
    services.actualizarProducto(producto)
        .then(productoEditado => res.status(202).json(productoEditado))
        .catch(err => res.status(500).json({ message: "No se pudo actualizar el elemento, intente en otro momento." }))
}
