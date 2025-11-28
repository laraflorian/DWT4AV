import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")
const collection = db.collection("Proyectos")

export async function getProyectos() {
    await client.connect()
    return collection.find({ eliminado: { $ne: true } }).toArray()
}

export async function crearProyecto(data, ussId) {
    await client.connect()
    data.creadoPor = new ObjectId(ussId)
    await collection.insertOne(data)
    return data
}

export async function borrarProyecto(id) {
    await client.connect()
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}