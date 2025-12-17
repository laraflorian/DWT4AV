import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")
const collection = db.collection("Comentarios")

export async function crearComentario(data, ussId) {
    await client.connect()
    data.autorId = new ObjectId(ussId)
    data.proyectoId = new ObjectId(data.proyectoId)
    data.fecha = new Date()
    await collection.insertOne(data)

    return data
}

export async function getComentarios(proyectoId){
    await client.connect()
    return collection.find({ proyectoId: new ObjectId(proyectoId) }).toArray()
}