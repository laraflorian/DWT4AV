import { MongoClient, ObjectId } from "mongodb"
import * as serviceProductos from "./productos.services.js"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")


export async function getMaquilladores(filter = {}) {
    const filterMongo = { eliminado: { $ne: true }}
    await client.connect()
    return db.collection("Maquilladores").find(filterMongo).toArray()
}

export async function getMaquilladorPorId(id) {
    console.log(id)
    await client.connect()
    return db.collection("Maquilladores").findOne({ _id: new ObjectId(id) })
}

export async function guardarMaquillador(maquillador) {
    const maquilladorNuevo = await db.collection("Maquilladores").insertOne(maquillador)
    return maquillador
}

export async function editarMaquillador(maquillador, _id) {
    console.log("maquillador con id", maquillador)
    const maquilladorEditado = await db.collection("Maquilladores")
        .findOneAndReplace({ _id: new ObjectId(_id) }, maquillador, { returnDocument: "after" })
    return maquilladorEditado.value
}

export function borrarMaquillador(id) {
    return db.collection("Maquilladores").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

export function actualizarMaquillador(maquillador, _id) {
    return db.collection("Maquilladores").updateOne({ _id: new ObjectId(_id) }, { $set: maquillador })
}

export async function asignarProducto(idMaquillador, idProducto) {
    await client.connect()
    const producto = await serviceProductos.getProductoPorId(idProducto)
    const maquillador = await getMaquilladorPorId(idMaquillador)
    console.log(producto)
    await db.collection("Maquilladores").updateOne({ _id: new ObjectId(idMaquillador) }, { $addToSet: { productos: { ...producto } } })
    await db.collection("Products").updateOne({ _id: new ObjectId(idProducto) }, { $addToSet: { loTienen: { ...maquillador } } })
   
    return { producto, maquillador }
}

export async function getProductosMaquillador(id) {
    await client.connect()
    const maquillador = await db.collection("Maquilladores").findOne({ _id: new ObjectId(id)})

    return maquillador.productos
}