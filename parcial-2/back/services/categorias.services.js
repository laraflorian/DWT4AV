import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")
const collection = db.collection("Categorias");

// Traer todas las categorias
export async function getCategorias() {
    await client.connect()
    return collection.find({ eliminado: { $ne: true } }).toArray();
}

export async function getCategoriaPorId(id) {
    await client.connect()
    return collection.findOne({ _id: new ObjectId(id) });
}

export async function crearCategoria(data) {
    await client.connect()
    await collection.insertOne(data);
    return data
}

export async function borrarCategoria(id) {
    await client.connect()
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: {eliminado: true} })
}