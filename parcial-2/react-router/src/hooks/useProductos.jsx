import { useEffect, useState } from "react";
import { useToken } from "../contexts/SessionContext";
import { getProductos, getProductosXId } from "../services/productos.services.js";

export function useProductos() {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const token = useToken()
    useEffect(() => {
        getProductos()
            .then(res => {
                if (!res.ok) throw new Error("error")
                return res.json()
            })
            .then(products => {
                console.log(products)
                setProductos(products)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { productos, error, loading }
}

export function useProducto(id) {
    const [producto, setProducto] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const token = useToken()
    useEffect(() => {
        getProductosXId(id)
            .then(res => {
                if (!res.ok) throw new Error("error")
                return res.json()
            })
            .then(product => {
                setProducto(product)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { producto, error, loading }
}