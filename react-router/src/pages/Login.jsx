import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '../contexts/SessionContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const login = useLogin()

    const handleLogin = () => {
        console.log(email, pass)
        fetch("http://localhost:3333/api/usuarios/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password: pass
            })
        })
            .then((res) => {
                if (!res.ok) throw new Error("Credenciales invalidas")
                return res.json()
            })
            .then(data => {
                console.log(data)
                login(data)
                navigate("/listado")
            })
            .catch(err => setErr(err.message))

    }
    return (
        <div className='max-w-4xl mx-auto p-6'>
            {
                err && <p>{err}</p>
            }
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Iniciar sesión</h1>
            <label htmlFor="email">Ingresar Email</label>
            <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Ingresar email'
                className="w-full mt-2 mb-3 p-3 border border-purple-300 rounded-md"
            />
            <label htmlFor="pass">Ingresar Contraseña</label>
            <input
                type='password'
                name='pass'
                id='pass'
                onChange={(e) => setPass(e.target.value)}
                placeholder='Ingresar contrañesa'
                className="w-full mt-2 p-3 border border-purple-300 rounded-md"
            />
            <div className='flex justify-center items-center h-30'>
                <button onClick={handleLogin} className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'> Ingresar </button>
            </div>
        </div>
    )
}

export default Login