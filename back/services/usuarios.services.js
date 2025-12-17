import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import { crearToken } from "./token.service.js"
import fs from 'fs'
import path from 'path'

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
        password: hashed,
        role: "user"
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

export async function getMiPerfil(userId) {
    await client.connect()

    const user = await db.collection("usuarios").findOne(
        { _id: new ObjectId(userId) },
        { projection: {password: 0} }
    )

    return user
}

export async function actualizarPerfil(userId, data) {
    await client.connect()

    const user = await db.collection("usuarios").findOne(
          { _id: new ObjectId(userId) }
    )

    // Borrar el avatar/foto anterior solo si llega uno nuevo
    if(data.avatar && user?.avatar) {
        const oldPath = path.join("uploads", user.avatar)
        if(fs.existsSync(oldPath)){
            fs.unlinkSync(oldPath)
        }
    }

    const update = {$set: {}}

    if (data.name) update.$set.name = data.name
    if (data.descripcion) update.$set.descripcion = data.descripcion
    if (data.avatar) update.$set.avatar = data.avatar

    await db.collection("usuarios").updateOne(
        { _id: new ObjectId(userId) },
       update
    )

    return getMiPerfil(userId)
}