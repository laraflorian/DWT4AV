import { call } from "./api.services";

export function getPerfil() {
    return call({ uri: "usuarios/perfil" })
}

export function editarPerfil(data) {
    return call({ uri: "usuarios/perfil", method: "PUT", body: data })
}

export function subirAvatar(formData) {
    const token = JSON.parse(localStorage.getItem("token"))
    // return call({ uri: "usuarios/perfil/avatar", method: "POST", body: formData })
    return fetch("http://localhost:3333/api/usuarios/perfil/avatar", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
}