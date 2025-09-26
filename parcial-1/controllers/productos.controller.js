import * as service from "../services/productos.services.js";
import * as views from "../views/productos.view.js";

export function getProductos(req, res) {
    const { categoria } = req.query
    service.getProductos({categoria}).then((productos) => {
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
    const producto = {
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: parseInt(req.body.precio),
        imagen: req.body.imagen,
        link: req.body.links
    }

    service.guardarProducto(producto)
        .then(productoGuardado => res.send(views.crearDetallePagina(productoGuardado)))
        .catch(err => res.send(views.errorPagina()))

    console.log(producto)
}

export function formEditarProducto(req, res) {
    const id = req.params.id
    console.log("editar producto", id)
    service.getProductoPorId(id)
        .then((producto) => res.send(views.formEditarProducto(producto)))
}

export function editarProducto(req, res) {
    const id = req.params.id
    const producto = {
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: parseInt(req.body.precio),
        imagen: req.body.imagen,
        link: req.body.link
    }
    service.editarProducto(producto, id)
    .then(productoEditado => res.send(views.crearDetallePagina(productoEditado)))
        // .then(productoEditado => res.json(productoEditado))
}

export function formBorrarProducto(req, res) {
    const id = req.params.id
    service.getProductoPorId(id)
        .then((producto) => res.send(views.formBorrarProducto(producto)))
}

export function borrarProducto(req, res) {
    const id = req.params.id
    service.borrarProducto(id)
        .then((id) => res.send(views.borrarExito(id)))
}