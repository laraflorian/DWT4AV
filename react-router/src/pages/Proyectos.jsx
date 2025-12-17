import React from "react";
import { useMisProyectos, useProyectos } from "../hooks/useProyectos"
import { Link } from 'react-router'

const Proyectos = () => {
    const { proyectos: todos, loading: loadingTodos, error: errorTodos } = useProyectos()
    const { proyectos: mios, loading: loadingMios, error: errorMios } = useMisProyectos()


    if (loadingTodos || loadingMios) return <p>Cargando...</p>
    if (errorTodos || errorMios) return <p>Error: {errorTodos} {errorMios}</p>

    // Para evitar que la muestra de proyectos se repita
    const idsMios = new Set(mios.map(p => p._id))
    const otrosProyectos = todos.filter(
        p => !idsMios.has(p._id)
    )

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Listado de proyectos</h1>
            {mios.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mt-6 mb-4">Proyectos donde participas</h2>
                    <Link to="/nuevo-proyecto" className='ms-7 p-2 border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Nuevo proyecto</Link>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {mios.map(p => (
                            <Link
                                key={p._id}
                                to={`/detalleProyecto/${p._id}`}
                                className="border p-4 rounded shadow hover:bg-pink-50"
                            >
                                <h3 className="text-2xl">{p.nombre}</h3>
                                <p className="text-gray-600">{p.descripcion}</p>

                            </Link>
                        ))}
                    </div>
                </>
            )}

            <h2 className="text-2xl font-semibold mt-6 mb-4"> Otros proyectos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {otrosProyectos.map(p => (
                    <Link
                        key={p._id}
                        to={`/detalleProyecto/${p._id}`}
                        className="border p-4 rounded shadow hover:bg-pink-50"
                    >
                        <h3 className="text-2xl">{p.nombre}</h3>
                        <p className="text-gray-600">{p.descripcion}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Proyectos