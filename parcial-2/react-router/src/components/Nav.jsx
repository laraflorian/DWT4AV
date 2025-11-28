import React, { Activity } from 'react'
import { Link } from 'react-router'
import { useSession, useUsuario } from '../contexts/SessionContext.jsx'

const Nav = () => {
    const usuario = useUsuario()
    console.log(usuario?.email)
    return (
        <header className='sticky top-0 z-50'>
            <nav className='bg-slate-950 shadow-sm pt-3'>
                <p className='text-2xl text-rose-200 text-center'>{usuario?.email || 'Sin cuenta'}</p>
                <div className='max-w-7xl mx-auto px-4 sm:px6 lg:px8'>
                    <div className='flex items-center space-x-4'>
                        <Link className="text-rose-200 hover:text-rose-700 py-2" to="/">Home</Link>
                        <Activity mode={usuario?.email ? "visible" : "hidden"} >
                            <Link className="text-rose-200 hover:text-rose-700 py-2" to="/listado">Productos</Link>
                            <Link className="text-rose-200 hover:text-rose-700 py-2" to="/logout">Cerrar sesión</Link>
                        </Activity>
                        <Activity mode={usuario?.email ? "hidden" : "visible"} >
                            <Link className="text-rose-200 hover:text-rose-700 py-2" to="/login">Iniciar sesión</Link>
                            <Link className="text-rose-200 hover:text-rose-700 py-2" to="/register">Registrarse</Link>
                        </Activity>
                    </div>

                </div>
            </nav>
        </header >
    )
}

export default Nav