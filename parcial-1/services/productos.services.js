import { readFile, writeFile } from "node:fs/promises"


export async function getProductos(eliminado = true) {
    return readFile("./data/productos.json", "utf-8")
        .then((data) => JSON.parse(data))
        .then( productos => {
            if( eliminado == true){
                return productos.filter( p => p.eliminado != true)
            } else {
                return productos
            }
        })
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

export function guardarProducto(producto) {
    return getProductos().then(async (productos) => {
        const nuevoProducto = {
            id: productos.length + 1,
            ...producto
        }
        productos.push(nuevoProducto)
        await writeFile("./data/productos.json", JSON.stringify(productos))
        return nuevoProducto
    })
}

// export function editarProducto(id, producto){
//     return getProductos().then(async (productos) => {
//         const productoEditado = {
//             id: id,
//             ...producto
//         }
//         const nuevaLista = productos.filter( p => p.id != id)
//         nuevaLista.push(productoEditado)
//         await writeFile( "./data/productos.json", JSON.stringify(nuevaLista)) 
//         return productoEditado
//     })
// }
// export function editarProducto(producto){
//     return getProductos().then(async (productos) => {
//         const nuevaLista = productos.filter( p => p.id != producto.id)
//         nuevaLista.push(producto)
//         await writeFile( "./data/productos.json", JSON.stringify(nuevaLista)) 
//         return producto
//     });
// }

export function editarProducto(producto) {
    return getProductos().then(async (productos) => {
        const index = productos.findIndex(p => p.id == producto.id);
        if (index !== -1) {
            productos.splice(index, 1, producto);
        }
        await writeFile("./data/productos.json", JSON.stringify(productos))
        return producto
    });
}

export function borrarProducto(id) {
    return getProductos().then(async (productos) => {

        const nuevoListado = productos.map( p => {
            if(p.id == id){
                p.eliminado = true
            }
            return p
        })
        await writeFile("./data/productos.json", JSON.stringify(nuevoListado))

        return id
    });
}