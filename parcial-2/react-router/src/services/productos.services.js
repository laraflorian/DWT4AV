import { call } from "./api.services"

const uri = "productos"

export function getProductos() {
    return call({uri: 'productos'})
}

export function getProductosXId( id) {
    return call({uri: 'productos/' + id})
}

export function crearProducto(producto){
    return call( {uri: 'productos', method:'POST', body: producto} )
}

export function editarProducto(id, producto){
    return call( {uri: 'productos/' + id, method:'PUT', body: producto} )
}

export function borrarProducto(id){
    return call( {uri: 'productos/' + id, method: 'DELETE'})
}