import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import { crearToken } from "./token.service.js"

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.zbcovsj.mongodb.net/")
const db = client.db("AH20232CP1")


export async function createUser(usuario) {
    await client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("No se pudo registar el usuario porque ya existe")


    // const nuevoUsuario = { ...usuario, password: null, passwordConfirm: null }
    const hashed = await bcrypt.hash(usuario.password, 10)
    const nuevoUsuario = {
        email: usuario.email,
        name: usuario.name,
        password: hashed
    }
    await db.collection("usuarios").insertOne(nuevoUsuario)
    return { ...nuevoUsuario, password: undefined }
}

export async function login(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("No se pudo encontrar el usuario")

    const token = await crearToken(existe)
    return { ...existe, password: undefined, passwordConfirm: undefined, token }
}