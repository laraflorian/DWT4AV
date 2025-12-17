import { Link } from "react-router";
import { usePerfil } from "../hooks/usePerfil";

export default function Perfil() {
    const { perfil, loading, error } = usePerfil()
    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="max-w-4xl mx-auto p-5 text-center">
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Mi perfil</h1>
            <div className=' bg-fuchsia-100 rounded-3xl pt-10 pb-10'>


                {perfil.avatar && (
                    <img src={`http://localhost:3333/uploads/${perfil.avatar}`}
                        alt={`foto de perfil de ${perfil.email}`}
                        className="w-32 h-32 rounded-full mx-auto"
                    />
                )}
                <div className="pt-5">
                    <h2 className="text-3xl">{perfil.name}</h2>
                    <p className="text-xl">{perfil.email}</p>
                    <p className="text-xl">" {perfil.descripcion} "</p>

                    <Link to="/perfil/editar"
                    className="  mx-auto grid place-items-center h-10 w-1/6 mt-4 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50">
                        Editar perfil
                    </Link>
                </div>
            </div>
        </div>
    )
}