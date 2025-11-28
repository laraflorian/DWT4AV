import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useProductos } from '../hooks/useProductos.jsx'


const Listado = () => {
    const { productos, error, loading } = useProductos()
    if (error) {
        return <div>Error al cargar el contenido</div>
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div>
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Listado de productos</h1>
            <Link to="/nuevo-producto" className='ms-7 p-2 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Nuevo producto</Link>
            <div className='ps-5 pe-5 pb-5'>
                {
                    productos.map(producto =>
                        <div className='flex flex-row border-b-2 border-rose-300 p-4' key={producto._id}>
                            <p className='basis-4/5'> {producto.nombre}</p>
                            <div className='basis-1/5 justify-end'>
                                <Link to={"/detalle/" + producto._id} className='p-2 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Ver</Link>
                                <Link to={"/editar-producto/" + producto._id} className='ms-3 p-2 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Editar</Link>
                                <Link to={"/delete/" + producto._id} className='ms-3 p-2 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Borrar</Link>

                            </div>
                        </div>)
                }
            </div>

        </div>

    )
}

export default Listado