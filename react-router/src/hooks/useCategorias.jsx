import { useEffect, useState } from "react";
import { getCategorias, getCategoriaXId } from "../services/categorias.services.js";

export function useCategorias() {
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getCategorias()
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener categorías")
                return res.json()
            })
            .then(data => setCategorias(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { categorias, loading, error }
}

export function useCategoriaXId(id) {
    const [categoria, setCategorias] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getCategoriaXId(id)
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener la categoría")
                return res.json()
            })
            .then(data => setCategorias(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    return { categoria, loading, error }
}