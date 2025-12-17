import { Link } from 'react-router'
import { useParams } from "react-router"
import { useCategoriaProductos } from '../hooks/useCategoriaProductos.jsx'
import { useCategoriaXId } from '../hooks/useCategorias.jsx'


const CategoriaProductos = () => {
    const { id } = useParams()
    const { productos, loading, error } = useCategoriaProductos(id)
    const { categoria, loading: loadingCategoria } = useCategoriaXId(id)

    if (loading || loadingCategoria) return <p>Cargando...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Productos en {categoria?.nombre}</h1>

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

export default CategoriaProductos