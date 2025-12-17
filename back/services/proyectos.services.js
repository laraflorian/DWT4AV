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
    data.colaboradores = []
    data.eliminado = false
    await collection.insertOne(data)
    return data
}

export async function getProyectoPorId(id) {
    await client.connect()
    const proyecto = await collection.findOne({ _id: new ObjectId(id) })
    if (!proyecto) return null

    // Obtener los productos
    if (proyecto.productos && proyecto.productos.length > 0) {
        const productosIds = proyecto.productos.map(p => new ObjectId(p))

        const productosCompletos = await db
            .collection('Products')
            .find({ _id: { $in: productosIds } })
            .toArray()
        proyecto.productos = productosCompletos
    }
    // Obtener usuarios 

    const usuariosIds = [
        proyecto.creadoPor,
        ...(proyecto.colaboradores || [])
    ]

    const usuarios = await db.collection("usuarios").find({ _id: { $in: usuariosIds } })
        .project({ password: 0 })
        .toArray()

    proyecto.usuarios = usuarios

    return proyecto
}

export async function editarProyecto(id, data, userId, role) {
    await client.connect()

    const proyecto = await collection.findOne({ _id: new ObjectId(id) })

    // const permitido =
    //     proyecto.creadoPor.toString() === userId ||
    //     proyecto.colaboradores?.some(c => c.toString() === userId)
    const esDueno = proyecto.creadoPor.toString() === userId
    const esColaborador = proyecto.colaboradores?.some(c => c.toString() === userId)
    const esAdmin = role === "admin"

    if (!esDueno && !esColaborador && !esAdmin) throw new Error("No autorizado")

    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    )

    return getProyectoPorId(id)
}

export async function borrarProyecto(id, userId, role) {
    await client.connect()

    const proyecto = await collection.findOne({ _id: new ObjectId(id)})
    if(!proyecto) throw new Error("Proyecto no encontrado.")

    const esDueno = proyecto.creadoPor.toString() === userId
    const esColaborador = proyecto.colaboradores?.some(c => c.toString() === userId)
    const esAdmin = role === "admin"

    if (!esDueno && !esColaborador && !esAdmin) throw new Error("No autorizado")
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
}

export async function agregarColaboradores(proyectoId, email, userId) {
    await client.connect()

    const proyecto = await collection.findOne({ _id: new ObjectId(proyectoId) })
    if (!proyecto) throw new Error("Proyecto no encontrado.")


    if (proyecto.creadoPor.toString() !== userId) {
        throw new Error("No tenés permiso para agregar usuarios.")
    }

    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) throw new Error("Usuario no encontrado.")

    await collection.updateOne(
        { _id: new ObjectId(proyectoId) },
        { $addToSet: { colaboradores: usuario._id } }
    )

    return collection.findOne({ _id: new ObjectId(proyectoId) })
}

export async function eliminarColaboradores(proyectoId, usuarioId, userId) {
    await client.connect()

    const proyecto = await collection.findOne({ _id: new ObjectId(proyectoId) })
    if (!proyecto) throw new Error("Proyecto no encontrado.")

    if (proyecto.creadoPor.toString() !== userId) {
        throw new Error("No tenés permisos para eliminar usuarios.")
    }

    if (usuarioId == userId) {
        throw new Error("No podés eliminarte a vos mismo.")
    }

    await collection.updateOne(
        { _id: new ObjectId(proyectoId) },
        { $pull: { colaboradores: new ObjectId(usuarioId) } }
    )

    return collection.findOne({ _id: new ObjectId(proyectoId) })
}

export async function getMisProyectos(userId) {
    await client.connect()

    return collection.find({
        eliminado: { $ne: true },
        $or: [
            { creadoPor: new ObjectId(userId) },
            { colaboradores: new ObjectId(userId) }
        ]
    }).toArray()
}