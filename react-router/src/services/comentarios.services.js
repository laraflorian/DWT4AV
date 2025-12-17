import { call } from "./api.services"

const uri = "comentarios"

export function getComentarios(proyectoId) {
    return call({ uri: `${uri}/${proyectoId}`})
}

export function crearComentario(data){
    return call({uri, method: "POST", body:data})
}