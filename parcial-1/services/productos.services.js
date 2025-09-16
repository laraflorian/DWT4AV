import { readFile } from "node:fs/promises"


export async function getProductos() {
    return readFile("./data/productos.json", "utf-8")
        .then((data) => JSON.parse(data))
        .catch(err => []);
}

export async function getProductoPorId(id) {
    return getProductos()
        .then((productos) => {
            let producto;
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id == id) {
                    producto = productos[i]
                }
            }
            return producto
        })
}
