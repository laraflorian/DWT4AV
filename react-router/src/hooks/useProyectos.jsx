import { useEffect, useState } from "react";
import { useToken } from "../contexts/SessionContext.jsx";
import { getMisProyectos, getProyectos, getProyectoXId } from "../services/proyectos.services.js";

export function useProyectos() {
    const [proyectos, setProyectos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getProyectos()
            .then(res => {
                if (!res.ok) throw new Error("error")
                return res.json()
            })
            .then(data => setProyectos(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])
    return { proyectos, loading, error }
}

export function useProyecto(id) {
    const [proyecto, setProyecto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const token = useToken()
    useEffect(() => {
        getProyectoXId(id)
            .then(res => {
                if (!res.ok) throw new Error("error, proyecto no encontrado.")
                return res.json()
            })
            .then(proyect => {
                setProyecto(proyect)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    return { proyecto, error, loading }
}

export function useMisProyectos() {
    const [proyectos, setProyectos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getMisProyectos()
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar proyectos.")
                return res.json()
            })
            .then(data => setProyectos(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { proyectos, loading, error }
}