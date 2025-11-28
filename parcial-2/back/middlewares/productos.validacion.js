import { productosSchema } from "../schemas/productos.js"

export function validarProducto(req, res, next){
    console.log("validando..")
    productosSchema.validate(req.body, {abortEarly:false, stripUnknown: true} )
        .then( () => next() )
        .catch( (err) => res.status(400).json({message: err.errors}))
}

export function validarId(req, res, next){
    if(req.params.id){
        next()
    }else{
        res.status(400).json({message: "El id es necesario para continuar"})
    }
}
