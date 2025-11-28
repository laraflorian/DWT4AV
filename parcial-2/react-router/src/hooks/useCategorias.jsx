import { useEffect, useState } from "react";
import { getCategorias } from "../services/categorias.services.js";

export function useCategorias(){
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getCategorias()
            .then(res => {
                if(!res.ok) throw new Error("Error al ibtener categorías")
                return res.json()
            })
            .then(data => setCategorias(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return {categorias, loading, error}
}