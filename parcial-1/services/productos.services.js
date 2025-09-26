// import { readFile, writeFile } from "node:fs/promises";
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")

export async function getProductos(filter = {}) {
    // filtros
    const filterMongo = {eliminado: { $ne: true } }

    if (filter.categoria) {
        filterMongo.categoria = filter.categoria
    }



    // tener todos los productos
    await client.connect()
    return db.collection("Products").find(filterMongo).toArray()
}  
 // return readFile("./data/productos.json", "utf-8")
    //     .then((data) => JSON.parse(data))
    //     .then(productos => {
    //         if (eliminado == true) {
    //             return productos.filter(p => p.eliminado != true)
    //         } else {
    //             return productos
    //         }
    //     })
    //     .catch(err => []);

    
export async function getProductoPorId(id) {
    console.log(id)
    await client.connect()
    return db.collection("Products").findOne({ _id: new ObjectId(id) })
}
 // return getProductos
    //     .then((productos) => {
    //         let producto;
    //         for (let i = 0; i < productos.length; i++) {
    //             if (productos[i].id == id) {
    //                 producto = productos[i]
    //             }
    //         }
    //         return producto
    //     });

    
export async function guardarProducto(producto) {
    const productoGuardado = await db.collection("Products").insertOne(producto)
    return producto
}
// return getProductos().then(async (productos) => {
//     const nuevoProducto = {
//         id: productos.length + 1,
//         ...producto
//     }
//     productos.push(nuevoProducto)
//     await writeFile("./data/productos.json", JSON.stringify(productos))
//     return nuevoProducto
// });

export async function editarProducto(producto, _id) {

    console.log("producto con id", producto)
    const productoEditado = await db.collection("Products").replaceOne({ _id: new ObjectId(_id) }, producto)
    producto._id = _id
   return producto
}
// return getProductos().then(async (productos) => {
//     const index = productos.findIndex(p => p.id == producto.id);
//     if (index !== -1) {
//         productos.splice(index, 1, producto);
//     }
//     await writeFile("./data/productos.json", JSON.stringify(productos))
//     return producto
// });

export function borrarProducto(id) {
    return db.collection("Products").updateOne({ _id: new ObjectId(id)}, {$set: {eliminado: true}})
}
// return getProductos().then(async (productos) => {

//     const nuevoListado = productos.map(p => {
//         if (p.id == id) {
//             p.eliminado = true
//         }
//         return p
//     })
//     await writeFile("./data/productos.json", JSON.stringify(nuevoListado))

//     return id
// });


export function actualizarProducto(producto) {
    return db.collection("Products").updateOne({ _id: new ObjectId(producto._id) }, { $set: producto })
}
    // return getProductos().then(async (productos) => {
    //     const nuevoListado = productos.map( p => {
    //         if(p.id == producto.id){
    //             return{
    //                 id: p.id,
    //                 nombre: producto.nombre || p.nombre,
    //                 categoria: producto.categoria || p.categoria,
    //                 marca: producto.marca || p.marca,
    //                 imagen: producto.imagen || p.imagen,
    //                 precio: producto.precio || p.precio,
    //                 link: producto.link || p.link
    //             }
    //         }
    //         return p 
    //     })
    //     await writeFile("./data/productos.json", JSON.stringify(productos))
    //     return producto
    // });
