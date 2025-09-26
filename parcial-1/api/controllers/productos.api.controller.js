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
}

export function crearProducto(req, res) {
    const producto = {
        categoria: req.body.categoria,
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
    const producto = {
        id: id,
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio,
        imagen: req.body.imagen,
        link: req.body.link
    }
    services.editarProducto(producto)
        .then(productoEditado => res.status(202).json(productoEditado))
        .catch(err => res.status(500).json({ message: "No se pudo actualizar el elemento." }))
}

export function actualizarProducto(req, res) {
    const id = req.params.id
    const producto = {
        id: id,
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio,
        imagen: req.body.imagen,
        link: req.body.link
    }
    services.actualizarProducto(producto)
        .then(productoEditado => res.status(202).json(productoEditado))
        .catch( err => res.status(500).json({message: "No se pudo actualizar el elemento, intente en otro momento."}))
}
