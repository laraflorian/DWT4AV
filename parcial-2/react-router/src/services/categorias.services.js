import { call } from "./api.services"

const uri = "categorias"

export function getCategorias() {
    return call({ uri: 'categorias' })
}