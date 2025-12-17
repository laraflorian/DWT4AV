import { useEffect, useState } from "react";
import { getProductos } from "../services/productos.services";

export function useCategoriaProductos(id) {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect(() => {
        getProductos(id)
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    return { productos, loading, error }
}