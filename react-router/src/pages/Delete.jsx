import { Link, useNavigate, useParams } from "react-router"
import { useProducto } from "../hooks/useProductos"
import { borrarProducto } from "../services/productos.services"

const Delete = () => {
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const { producto, error, loading } = useProducto(id)

    if (error) return <div>{error}</div>
    if (loading) return <div>Cargando...</div>

    const handleDelete = () => {
        borrarProducto(id)
            .then((res) => {
                if (!res.ok) return res.json()
                navigate("/listado")
            } )
            .catch( (err) => console.error(err) )
    }
    return <div className="text-center pb-3">
        <h1 className='text-4xl pt-3 pb-3 font-semibold'>¿Estas seguro que quieres eliminar {producto.nombre}?</h1>
        <p>La acción es irreversible</p>
        <div className="flex justify-evenly">
            <button onClick={ handleDelete } className="h-15 w-1/6 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50">Si</button>
            <Link to="/listado" className=" grid place-items-center w-1/6 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50">No</Link>
        </div>
    </div>
}

export default Delete