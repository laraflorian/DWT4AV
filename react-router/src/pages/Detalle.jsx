import React from 'react'
import { Link, useParams } from 'react-router'
import { useProducto } from '../hooks/useProductos'


const Detalle = () => {

  const params = useParams()
  const id = params.id

  const { producto, error, loading } = useProducto(id)

  if (error) return <div>Producto no encontrado</div>

  return !loading ? (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'> {producto.nombre} </h1>
      <div className='flex justify-evenly content-center bg-fuchsia-100 rounded-3xl pt-10 pb-10'>
        <div>
          {producto.imagen ? (
            <img src={producto.imagen}
              alt={`{producto.categoria?.nombre} de {producto.marca}`} className='p-3 max-h-120 max-w-120 shadow-lg' />
          ) : (
            <p>Sin imagen disponible</p>
          )}
        </div>
        <div className='content-center'>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categoría:</strong> {producto.categoria?.nombre}</p>
          <p><strong>Precio:</strong> ${producto.precio} </p>
          <div className='mt-10'>
            <a href={producto.link} className='p-2 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Ver tienda</a>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center h-30'>
        <Link to="/listado" className=' grid place-items-center h-10 w-1/6 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'> Volver </Link>
      </div>
    </div>
  ) : <div>Cargando</div>
}

export default Detalle