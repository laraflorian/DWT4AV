import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { editarPerfil, subirAvatar } from '../services/usuarios.services'

const EditarPerfil = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        descripcion: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmite = (e) => {
        e.preventDefault()

        editarPerfil(form)
            .then(res => res.json())
            .then(() => {
                alert("Perfil actualizado")
                navigate("/perfil")
            })
    }

    const handleSubirFoto = (e) => {
        e.preventDefault()
        const foto = e.target.fileAvatar.files[0]
        if (!foto) return

        // const token = JSON.parse(localStorage.getItem("token"))


        // console.log(foto)
        const formData = new FormData()
        formData.append('file', foto)

        subirAvatar(formData)
            .then(res => {
                if (!res.ok) throw new Error("No autorizado")
                return res.json()
            })
            .then(() => {
                alert("Avatar actualizado")
                navigate("/perfil")
            })
            .catch(console.error)


    }

    return (
        <div className="p-5 max-w-md mx-auto">
            <h1 className='text-4xl pt-3 pb-3 font-semibold text-center'>Editar perfil</h1>

            <form onSubmit={handleSubmite}>
                <div>
                    <label htmlFor="name">Nombre de usuario</label>
                    <input type="text"
                        name="name"
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-purple-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        name="descripcion"
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border border-purple-300 rounded-md"
                    >

                    </textarea>

                </div>

                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Guardar cambios</button>
                </div>
            </form>

            <form encType="multipart/form-data" onSubmit={handleSubirFoto}>
                <div>
                    <label htmlFor="archivoImg">Foto de perfil</label>
                    <input type="file" name="fileAvatar" className="w-full mt-2 p-3 border border-purple-300 rounded-md" />
                </div>

                <div className='flex justify-center items-center h-30'>
                    <button type="submit" className='p-2 w-3xl border rounded-lg border-pink-800 hover:bg-pink-800 hover:text-amber-50'>Guardar cambios</button>
                </div>
            </form>
        </div>
    )
}

export default EditarPerfil