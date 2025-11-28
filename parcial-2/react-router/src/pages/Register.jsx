import React, { Activity, useState } from 'react'
import { useNavigate } from 'react-router'

const Register = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [passConfirm, setPassConfirm] = useState("")
    const [name, setName] = useState("")
    const [err, setErr] = useState([])
    const [errores, setErrores] = useState({})
    const navigate = useNavigate()

    const validarForm = () => {
        const error = {}
        if (!email) {
            error.email = "El email es obligatorio"
        }
        
        if (!pass) {
            error.password = "La contraseña es requerida.  "
        } else {
            if (pass.length <= 8) {
                error.password += "La contraseña necesita al menos 8 caracteres.  "
            }
            if (!/[0-9]/.test(pass)) {
                error.password += "La contraseña debe contener al menos un número.   "
            }
            if (!/[A-Z]/.test(pass)) {
                error.password += "La contraseña debe contener al menos una mayuscula.  "
            }
            if (!/[a-z]/.test(pass)) {
                error.password += "La contraseña debe contener al menos una minuscula"
            }
        }
        if (!passConfirm) {
            error.passwordConfirm = "Es necesario confirmar la contraseña"
        } else if (passConfirm !== pass) {
            error.passwordConfirm = "La contraseñas no coinciden"
        }
        if (name.length > 20) {
            error.name = "El nombre tiene que tener menos de 20 caracteres"
        }
        setErrores(error)
        return Object.keys(error).length > 0
    }

    const handleLogin = () => {
        console.log(email, pass)
        if (validarForm()) return
        fetch("http://localhost:3333/api/usuarios", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password: pass,
                passwordConfirm: passConfirm,
                name
            })
        })
            .then(async (res) => {
                if (!res.ok) throw await res.json()
                return res.json()
            })
            .then(data => {
                console.log(data)
                navigate("/login")
            })
            .catch(err => setErr(err.message))

    }
    console.log(err)
    return (
        <div className='max-w-4xl mx-auto p-6'>

            <Activity mode={err.length > 0 ? 'visible' : 'hidden'} >
                {
                    err?.map((error, i) => <p key={i} style={{ color: "red" }}>{error}</p>)
                }
            </Activity>
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Registrarse</h1>

            <div>
                <label htmlFor="name">Ingresar nombre</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Ingresar nombre de usuario'
                    className="w-full mt-2 mb-3 p-3 border border-purple-300 rounded-md"
                />
                <Activity mode={errores?.name ? 'visible' : 'hidden'}>
                    <p style={{ color: "red" }}>{errores.name}</p>
                </Activity>
            </div>
            <div>
                <label htmlFor="email">Ingresar email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Ingresar email'
                    className="w-full mt-2 mb-3 p-3 border border-purple-300 rounded-md"
                />
                <Activity mode={errores?.email ? 'visible' : 'hidden'}>
                    <p style={{ color: "red" }}>{errores.email}</p>
                </Activity>
            </div>
            <div>
                <label htmlFor="pass">Ingresar contraseña</label>

                <input
                    type='password'
                    id='pass'
                    name='pass'
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='Ingresar contrañesa'
                    className="w-full mt-2 mb-3 p-3 border border-purple-300 rounded-md"
                />
                <Activity mode={errores?.password ? 'visible' : 'hidden'}>
                    <p style={{ color: "red" }}>{errores.password}</p>
                </Activity>
            </div>
            <div>
                <label htmlFor="passConfirm">Confirmar contraseña</label>
                <input
                    type='password'
                    id='passConfirm'
                    name='passConfirm'
                    onChange={(e) => setPassConfirm(e.target.value)}
                    placeholder='Confirmar contraseña'
                    className="w-full mt-2 mb-3 p-3 border border-purple-300 rounded-md"
                />
                <Activity mode={errores?.passwordConfirm ? 'visible' : 'hidden'}>
                    <p style={{ color: "red" }}>{errores.passwordConfirm}</p>
                </Activity>
            </div>
            <div className='flex justify-center items-center h-30'>
                <button onClick={handleLogin} className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'> Ingresar </button>
            </div>
        </div>
    )
}

export default Register