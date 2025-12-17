import { call } from "./api.services"

const uri = "categorias"

export function getCategorias() {
    return call({ uri: 'categorias' })
}

export function getCategoriaXId(id){
    return call({ uri: 'categorias/' + id})
}