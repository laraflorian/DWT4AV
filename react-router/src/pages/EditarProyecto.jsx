import React, { Activity, useState } from 'react'
// import { crearProyecto } from '../services/proyectos.services'
import { useNavigate, useParams } from 'react-router'
import { useUsuario } from '../contexts/SessionContext'
import { useProyecto } from '../hooks/useProyectos'
import { useProductos } from '../hooks/useProductos'
import { useEffect } from 'react'
import { agregarColaboradores, eliminarColaboradores, editarProyecto } from '../services/proyectos.services'

const EditarProyecto = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const usuario = useUsuario()

    const { proyecto, loading } = useProyecto(id)
    const { productos, loadingProductos } = useProductos()
    const [descripcion, setDescripcion] = useState("")

    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [errores, setErrores] = useState({})
    const [email, setEmail] = useState("")

    const esDueno = proyecto?.creadoPor === usuario._id

    useEffect(() => {
        if (proyecto) {
            setDescripcion(proyecto.descripcion || "")
            setProductosSeleccionados(
                proyecto.productos?.map(p => p._id) || []
            )
            
        }
    }, [proyecto])

    const validar = (payload) => {
        const err = {}
        if (!payload.nombre) err.nombre = "El nombre es obligatorio."
        setErrores(err)
        return Object.keys(err).length === 0
    }

    const cambiarProducto = (id) => {
        setProductosSeleccionados(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        )
    }

    // Editar proeycto
    const handleEnviar = (e) => {
        e.preventDefault()

        const payload = {
            nombre: e.target.nombre.value,
            descripcion: e.target.descripcion.value,
            productos: productosSeleccionados
        }

        if (!validar(payload)) return

        editarProyecto(id, payload)
            .then(res => {
                if (!res.ok) throw res
                navigate(`/detalleProyecto/${id}`)
            })
    }

    // Colaboradores
    const handleAgregar = (e) => {
        e.preventDefault()

        agregarColaboradores(id, email)
            .then(res => res.ok && setEmail(""))
    }

    const handleEliminar = (uid) => {
        eliminarColaboradores(id, uid)
            .then(res => res.ok && location.reload())
    }

    if (loading) return <p>Cargando...</p>
    if (loadingProductos) return <p>Cargando productos...</p>

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Editar proyecto</h1>

            <form onSubmit={handleEnviar}>
                <div>
                    <label htmlFor="nombre">Nombre del proyecto</label>
                    <input type="text"
                        name='nombre'
                        defaultValue={proyecto.nombre}
                        className="w-full mt-2 p-3 border border-purple-300 rounded-md" />
                    <Activity mode={errores.nombre ? 'visible' : 'hidden'}>
                        <p>{errores.nombre}</p>
                    </Activity>
                </div>

                <div>
                    <label htmlFor="descripcion">Descripción del proyecto</label>
                    <textarea
                        name="descripcion"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                        className='w-full mt-2 p-3 border border-purple-300 rounded-md'
                    > </textarea>
                </div>

                <div className='grid grid-cols-1 md:grid-cols2 gap-2'>
                    <h2 className='mt-4'>Productos</h2>
                    {productos.map(prod => (
                        <label key={prod._id} className='border p-3 rounded flex gap-2 cursor-pointer'>
                            <input
                                type="checkbox"
                                checked={productosSeleccionados.includes(prod._id)}
                                onChange={() => cambiarProducto(prod._id)}
                            />
                            {prod.nombre}
                        </label>
                    ))}
                </div>
                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Guardar cambios</button>
                </div>
            </form>

            {/* form de colaboradores */}
            {esDueno && (
                <div>
                    <h2 className="text-xl">Colaboradores del proyecto</h2>
                    <form onSubmit={handleAgregar}>
                        <div>
                            <label htmlFor="colaboradores">Ingresa el mail del usuario que desees sumar</label>

                            <input
                                type="email"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                className="w-full mt-2 p-3 border border-purple-300 rounded-md mb-8"
                                placeholder='Email de usuario'
                            />
                            <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Agregar</button>
                        </div>
                    </form>

                    <div>
                        <h3>Colaboradores actuales</h3>
                        <ul className='mt-3'>
                            {proyecto.usuarios.filter(uss => uss._id !== proyecto.creadoPor)
                                .map(uss => (
                                    <li key={uss._id}>
                                        {uss.email}
                                        <button onClick={() => handleEliminar(uss._id)}>Eliminar</button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>

    )
}

export default EditarProyecto

