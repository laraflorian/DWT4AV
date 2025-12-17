import React, { Activity, useState } from 'react'
import { useProductos } from "../hooks/useProductos"
import { crearProyecto } from '../services/proyectos.services'
import { useNavigate } from 'react-router'

const NuevoProyecto = () => {
    const { productos, loading } = useProductos()
    const navigate = useNavigate()
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [errores, setErrores] = useState({})


    const validate = (payload) => {
        const err = {}
        if (!payload.nombre) err.nombre = "El nombre es obligatorio."
        if (!payload.productos.length === 0) err.productos = "Es necesario que incluya algun producto usado."
        setErrores(err)
        return Object.keys(err).length == 0
    }

    const toggleProducto = (id) => {
        if (productosSeleccionados.includes(id)) {
            setProductosSeleccionados(productosSeleccionados.filter(p => p !== id))
        } else {
            setProductosSeleccionados([...productosSeleccionados, id])
        }
    }

    const handleSubmite = (e) => {
        e.preventDefault()

        const payload = {
            nombre: e.target.nombre.value,
            descripcion: e.target.descripcion.value,
            productos: productosSeleccionados
        }

        if (!validate(payload)) return

        crearProyecto(payload)
            .then(async res => {
                if (!res.ok) throw await res.json()
                navigate("/proyectos")
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Nuevo proyecto</h1>
            <form onSubmit={handleSubmite}>
                <div className="pt-4">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="w-full mt-2 p-3 border border-purple-300 rounded-md"
                        name="nombre"
                    />
                    <Activity mode={errores.nombre ? 'visible' : 'hidden'}>
                        <p>{errores.nombre}</p>
                    </Activity>
                </div>

                <div className="pt-4">
                    <label htmlFor="descripcion">Describe el maquillaje</label>
                    <textarea
                        className='w-full border p-2 rounded mb-3'
                        name="descripcion"
                    >
                    </textarea>
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">Productos en el maquillaje</h2>
                {loading && <p>Cargando productos...</p>}

                <div className='grid grid-cols-1 md:grid-cols2 gap-3'>
                    {productos.map(prod => (
                        <label key={prod._id} className='border p-3 rounded flex gap-2 cursor-pointer'>
                            <input
                                type="checkbox"
                                name="productos"
                                checked={productosSeleccionados.includes(prod._id)}
                                onChange={() => toggleProducto(prod._id)}
                            />
                            <span>{prod.nombre} - {prod.marca}</span>
                        </label>
                    ))}

                    <Activity mode={errores.productos ? 'visible' : 'hidden'}>
                        <p>{errores.productos}</p>
                    </Activity>

                </div>

                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Guardar</button>
                </div>

            </form>

        </div>
    )

}

export default NuevoProyecto