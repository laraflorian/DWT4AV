import React, { Activity, useEffect, useState } from 'react'
import { getComentarios, crearComentario } from '../services/comentarios.services'
import { useProyecto } from '../hooks/useProyectos'
import { Link, useNavigate, useParams } from 'react-router'
import { useUsuario } from '../contexts/SessionContext'
import { borrarProyecto } from '../services/proyectos.services'


const ProyectoDetalle = () => {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id;
    const usuario = useUsuario()
    const esAdmin = usuario?.role === "admin"
    const { proyecto, error, loading } = useProyecto(id)

    const usuarioId = usuario?._id.toString()

    const esDueno = proyecto?.creadoPor?.toString() === usuarioId
    const esColaborador = proyecto?.colaboradores?.some(c => c.toString() === usuarioId)

    const puedeEditar = usuarioId && (esDueno || esColaborador || esAdmin)


    const [comentarios, setComentarios] = useState([]);
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        getComentarios(id)
            .then(async res => {
                if (!res.ok) throw res
                return res.json()
            })
            .then(setComentarios)
            .catch(e => console.error(e))
    }, [id])

    const handleSubmite = (e) => {
        e.preventDefault()

        crearComentario({
            proyectoId: id,
            mensaje
        })
            .then(async res => {
                if (!res.ok) throw await res.json()
                return res.json()
            })
            .then(nuevoComentario => {
                setComentarios([...comentarios, nuevoComentario])
                setMensaje("")
            })
            .catch(err => console.error(err))
    }

    const handleEliminar = () => {
        if (!window.confirm("¿Estás seguro de eliminar este proyecto? La acción es irreversible")) return

        borrarProyecto(id)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo realizar la acción.")
                navigate("/proyectos")
            })
            .catch(err => alert(err.message))
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>{error}</div>
    if (!proyecto) return <div>Proyecto no encontrado</div>

    return !loading ? (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl mb-6">Proyecto {proyecto?.nombre}</h1>
            <div>
                <h3>Participantes</h3>
                <ul>
                    {proyecto.usuarios.map(u => (
                        <li key={u._id}>
                            {u.name} ( {u.email} )
                            {u._id === proyecto.creadoPor && "  Creador"}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='content-center bg-fuchsia-100 rounded-3xl pt-10 pb-10 ps-5 mt-3'>
                <p>{proyecto.descripcion}</p>
                <h2 className='pt-5 pb-2'>Productos usados:</h2>
                <ul className="list-disc pl-6">
                    {proyecto.productos?.map(prod => (
                        <li key={prod._id}>
                            {prod.nombre}  de {prod.marca} - ${prod.precio}
                        </li>
                    ))}
                </ul>
                <div>
                    {puedeEditar && (
                        <div className="flex gap-3 mt-4">
                            <Link to={`/proyecto-editar/${id}`}
                                className='grid place-items-center mt-3 h-10 w-1/6 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>
                                Editar proyecto
                            </Link>

                            <button onClick={handleEliminar} className='grid place-items-center mt-3 h-10 w-1/6 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Eliminar proyecto</button>
                        </div>
                    )}


                </div>
            </div>
            <div className='mt-5'>
                <h2>Comentarios</h2>

                {comentarios.length === 0 ? (
                    <p>¡Sé el primero en comentar!</p>
                ) : (
                    comentarios.map(c => (
                        <div key={c._id} className="border p-3 mt-3 rounded">
                            <p>{c.autorId}</p>
                            <p>{c.mensaje}</p>
                        </div>
                    ))
                )}

            </div>

            <form onSubmit={handleSubmite} className='mt-6'>
                <textarea
                    onChange={e => setMensaje(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Deja tu opinion'>
                </textarea>
                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Publicar comentario</button>
                </div>
            </form>
            <div className='flex justify-center items-center h-30'>
                <Link to="/proyectos" className='grid place-items-center h-10 w-1/6 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'> Volver </Link>
            </div>
        </div>
    ) : <div>Cargando</div>
}

export default ProyectoDetalle