import { call } from "./api.services"

const uri = "proyectos"

export function getProyectos(){
    return call({ uri })
}

export function getMisProyectos(){
    return call({uri: `${uri}/mios`})
}

export function crearProyecto(data){
    return call({ uri, method: "POST", body: data})
}

export function getProyectoXId(id) {
     return call({uri: 'proyectos/' + id})
}

export function editarProyecto(id, data){
    return call({uri:`${uri}/${id}`, method:"PUT", body:data})
}

export function borrarProyecto(id){
    return call({ uri: `${uri}/${id}`, method: "DELETE"})
}

export function agregarColaboradores(id, email) {
    return call({uri: `${uri}/${id}/colaboradores`, method: "POST", body: {email}})
}

export function eliminarColaboradores(id, usuarioId){
    return call({uri: `${uri}/${id}/colaboradores/${usuarioId}`, method: "DELETE"})
}

