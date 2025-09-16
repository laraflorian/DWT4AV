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