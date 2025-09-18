import * as service from "../services/productos.services.js";
import * as views from "../views/productos.view.js";

export function getProductos(req, res) {
    service.getProductos().then((productos) => {
        res.send(views.crearListadoProductosPage(productos));
    });
}

export function getProductoPorId(req, res) {
    const id = req.params.id
    service.getProductoPorId(id).then((producto) => {
        if (producto) {
            res.send(views.crearDetallePagina(producto));
        } else {
            res.send(views.errorPagina());
        }
    });
}

export function formNuevoProducto(req, res) {
    res.send(views.formNuevoProducto())
}

export function guardarProducto(req, res) {
    // console.log("datelle:", req.body)
    const producto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio
    }
    // const producto = req.body

    service.guardarProducto(producto)
        .then(productoGuardado => res.send(views.crearDetallePagina(productoGuardado)))
        .catch(err => res.send(views.errorPagina()))

    console.log(producto)
}

export function formEditarProducto(req, res) {
    const id = req.params.id
    service.getProductoPorId(id)
        .then((producto) => res.send(views.formEditarProducto(producto)))
}

export function editarProducto(req, res) {
    const id = req.params.id
    const producto = {
        id: id,
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio
    }
    service.editarProducto(producto)
    .then( productoEditado => res.send(views.crearDetallePagina(productoEditado)))
}

export function formBorrarProducto(req, res){
    const id = req.params.id
    service.getProductoPorId(id)
        .then( (producto) => res.send(views.formBorrarProducto(producto)))
}

export function borrarProducto(req, res){
    const id = req.params.id
    service.borrarProducto(id)
        .then( (id) => res.send(views.borrarExito(id)))
}