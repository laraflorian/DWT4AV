import React, { Activity, useState } from 'react'
import { crearProducto } from '../services/productos.services'
import { useNavigate } from 'react-router'
import { useCategorias } from '../hooks/useCategorias'


const NuevoProducto = () => {
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()
    const { categorias, loading, error } = useCategorias()

    const validateForm = (payload) => {
        const error = {}

        if (!payload.nombre) {
            error.nombre = "El nombre es requerido. "
        } else {
            if (payload.nombre.length < 3) error.nombre = " El nombre debe tener al menos 3 caracteres."
        }
        if (!payload.marca) {
            error.marca = "La marca es requerido. "
        } else {
            if (payload.marca.length < 3) error.marca = " La marca debe tener al menos 3 caracteres."
        }

        if (!payload.precio) {
            error.precio = "El precio es un campo requerido. "
        } else {
            if (payload.precio < 0) error.precio = " El precio debe ser un número positivo. "
        }


        setErrores(error)
        return Object.keys(error).length == 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            nombre: e.target.nombre.value,
            marca: e.target.marca.value,
            categoria: e.target.categoria.value,
            precio: e.target.precio.value,
            imagen: e.target.imagen.value,
            link: e.target.link.value
        }

        if (!validateForm(payload)) return

        crearProducto(payload)
            .then(async res => {
                if (!res.ok) throw await res.json()
                navigate("/listado")
            })
            .catch(err => console.error(err))
    }
    return (
        <div className='max-w-4xl mx-auto p-6'>
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Nuevo producto</h1>
            <form onSubmit={handleSubmit} className=''>
                <div className="pt-4 ">
                    <label htmlFor="nombre" className="">Nombre</label>
                    <input type="text" className="w-full mt-2 p-3 border border-purple-300 rounded-md" name="nombre" />
                    <Activity mode={errores.nombre ? 'visible' : 'hidden'}>
                        <p>{errores.nombre}</p>
                    </Activity>
                </div>
                <div className="pt-4">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" className="w-full mt-2 p-3 border border-purple-300 rounded-md" name="marca" />
                    <Activity mode={errores.marca ? 'visible' : 'hidden'}>
                        <p>{errores.marca}</p>
                    </Activity>
                </div>
                <div className="pt-4">
                    <label htmlFor="categoria">Categoría</label>
                    <select name="categoria" className="w-full mt-2 p-3 border border-purple-300 rounded-md">
                        <option value="">Seleccionar categoría</option>
                        {categorias.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                    {loading && <p>Cargando categorías</p>}
                    <Activity mode={errores.categoria ? 'visible' : 'hidden'}>
                        <p>{errores.categoria}</p>
                    </Activity>
                    {error && <p>Error: {error} </p>}
                </div>
                <div className="pt-4">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" name="precio" className="w-full mt-2 p-3 border border-purple-300 rounded-md" />
                    <Activity mode={errores.precio ? 'visible' : 'hidden'}>
                        <p>{errores.precio}</p>
                    </Activity>
                </div>
                <div className="pt-4">
                    <label htmlFor="imagen">Link de imagen</label>
                    <input type="text" name="imagen" className="w-full mt-2 p-3 border border-purple-300 rounded-md" />
                    <label htmlFor="link">Link del sitio</label>
                    <input type="text" name="link" className="w-full mt-2 p-3 border border-purple-300 rounded-md" />

                </div>
                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default NuevoProducto