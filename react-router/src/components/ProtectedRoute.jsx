import React from 'react'
import { Navigate } from 'react-router'
import { useToken } from '../contexts/SessionContext'

const ProtectedRoute = ({element}) => {
    const token = useToken()
    if(token) return element

    return <Navigate to="/login" />
}

export default ProtectedRoute