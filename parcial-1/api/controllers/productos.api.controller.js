import * as services from "../../services/productos.services.js"

export function getProductos(req, res){
 services.getProductos()
    .then( productos => res.status(200).json(productos) )
}

export function getProductoPorId(req, res){
    const id = req.params.id
    services.getProductoPorId(id)
        .then( producto => {
            if(producto){
                res.status(200).json(producto)
            }else{
                res.status(404).json({message: "Elemento no encontrado"})
            }
        } )
}