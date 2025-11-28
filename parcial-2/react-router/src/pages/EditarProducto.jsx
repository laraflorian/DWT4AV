import React, { Activity, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { editarProducto } from '../services/productos.services'
import { useProducto } from '../hooks/useProductos'
import { useCategorias } from '../hooks/useCategorias'

const EditarProducto = () => {
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    const { producto, error, loading } = useProducto(id)
    const { categorias, loading: catLoading, error: catError } = useCategorias()


    if (error) return <div>Producto no encontrado</div>
    if (loading) return <div>Cargando...</div>

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

        editarProducto(id, payload)
            .then(async res => {
                if (!res.ok) throw await res.json()
                navigate("/listado")
            })
            .catch(err => console.error(err))
    }
    return (
        <div className='max-w-4xl mx-auto p-6'>
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Editar producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="pt-4">
                    <label htmlFor="nombre" className="">Nombre</label>
                    <input type="text" className="w-full mt-2 p-3 border border-purple-300 rounded-md" name="nombre" defaultValue={producto.nombre} />
                    <Activity mode={errores.nombre ? 'visible' : 'hidden'}>
                        <p>{errores.nombre}</p>
                    </Activity>
                </div>
                <div className="pt-4">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" className="w-full mt-2 p-3 border border-purple-300 rounded-md" name="marca" defaultValue={producto.marca} />
                    <Activity mode={errores.marca ? 'visible' : 'hidden'}>
                        <p>{errores.marca}</p>
                    </Activity>
                </div>
                <div className="pt-4">
                    <label htmlFor="categoria">Categoría</label>
                    <select name="categoria" defaultValue={producto.categoria?._id} className="w-full mt-2 p-3 border border-purple-300 rounded-md">

                        {categorias.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                    {catLoading && <p>Cargando categorías</p>}
                    {catError && <p>{catError}</p>}
                </div>
                <div className="pt-4">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" name="precio" className="w-full mt-2 p-3 border border-purple-300 rounded-md" defaultValue={producto.precio} />
                    <Activity mode={errores.precio ? 'visible' : 'hidden'}>
                        <p>{errores.precio}</p>
                    </Activity>
                </div>
                <div className="pt-4">
                    <label htmlFor="imagen" className='pt-4'>Link de imagen</label>
                    <input type="text" name="imagen" className="w-full mt-2 p-3 border border-purple-300 rounded-md" defaultValue={producto.imagen} />
                    <label htmlFor="link" className='pt-4'>Link del sitio</label>
                    <input type="text" name="link" className="w-full mt-2 p-3 border border-purple-300 rounded-md" defaultValue={producto.link} />

                </div>
                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Actualizar</button>
                </div>
            </form>
        </div>
    )
}

export default EditarProducto