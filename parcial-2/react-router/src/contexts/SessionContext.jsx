import { createContext, useContext, useState } from "react"

const SessionContext = createContext()

export function useSession() {
    const session = useContext(SessionContext)
    return session
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useToken() {
    const { token } = useSession()
    return token
}

export function useLogout(){
    const { onLogout } = useSession()
    return onLogout
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")));
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")))
    const onLogin = (usuario) => {
        setUsuario(usuario)
        setToken(usuario.token)
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("token", JSON.stringify(usuario.token))
    }

    const onLogout = () => {
        setUsuario("")
        setToken("")
        localStorage.clear()
    }

    return (
        <SessionContext.Provider value={{ usuario, setUsuario, onLogin, token, onLogout }}>
            {children}
        </SessionContext.Provider>)
}

export { SessionContext }