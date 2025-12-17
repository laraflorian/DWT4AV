import { useEffect } from "react";
import { useState } from "react";
import { getPerfil } from "../services/usuarios.services";

export function usePerfil() {
    const [perfil, setPerfil] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getPerfil()
            .then(res => res.json())
            .then(data => setPerfil(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { perfil, loading, error }
}