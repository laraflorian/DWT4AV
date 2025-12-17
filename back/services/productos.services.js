// import { readFile, writeFile } from "node:fs/promises";
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")

export async function getProductos(filter = {}) {
    // tener todos los productos
    await client.connect()

    // filtros
    const filterMongo = { eliminado: { $ne: true } }

    //version anterior del filtro categoria
    // if (filter.categoria) {
    //     filterMongo.categoria = filter.categoria
    // }
    // ------
    if(filter.categoria) {
        try {
            filterMongo.categoria = new ObjectId(filter.categoria)
        } catch(err){
            console.log("Categoría invalida", filter.categoria)
        }
    }


    const productosCompletos = await db.collection("Products").find(filterMongo).toArray()
    // mostrar bien la categoria
    for (let producto of productosCompletos) {
        if (producto.categoria) {
            const cat = await db
                .collection("Categorias")
                .findOne({ _id: producto.categoria })

            producto.categoria = cat
        }
    }
    return productosCompletos
}

export async function getProductoPorId(id) {
    await client.connect()
    // return db.collection("Products").findOne({ _id: new ObjectId(id) })
    const producto = await db.collection("Products").findOne({ _id: new ObjectId(id) })
    if(!producto) return null

    const categoria = await db.collection("Categorias").findOne({ _id: producto.categoria})

    producto.categoria = categoria

    return producto
}

export async function guardarProducto(producto) {
    const productoGuardado = await db.collection("Products").insertOne(producto)
    return producto
}


export async function editarProducto(producto, _id) {
    console.log("producto con id", producto)
    await db.collection("Products").updateOne(
        { _id: new ObjectId(_id) }, 
        { $set: producto})
    // const productoEditado = await db.collection("Products").updateOne({ _id: new ObjectId(_id) }, { $set: producto})

    producto._id = _id
    return producto
}


export function borrarProducto(id) {
    return db.collection("Products").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}



export function actualizarProducto(producto) {
    return db.collection("Products").updateOne({ _id: new ObjectId(producto._id) }, { $set: producto })
}
