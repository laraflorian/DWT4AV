import React from 'react'
import { Navigate } from 'react-router'
import { useUsuario } from '../contexts/SessionContext'

const ProtectedRouteAdmin = ({element}) => {
    const usuario = useUsuario()

    // const session = JSON.parse( localStorage.getItem("session") )
    // if(session && session.rol == "admin") return element

    if(!usuario) return <Navigate to="/login" />
    if(usuario.role !== "admin") return <Navigate to="/" />

    return element 
}

export default ProtectedRouteAdmin