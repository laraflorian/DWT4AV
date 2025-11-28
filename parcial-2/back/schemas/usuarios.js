import yup from 'yup'

export const usuariosSchema = yup.object({
    email: yup.string().email().typeError("Debe ingresar un mail valido").required("El mail es un campo requerido"),
    password: yup.string().required("La contraseña es un campo requerido").min(8, "La contraseña debe tener al menos 8 caracteres")
                    .matches(/[0-9]/, "La contraseña debe tener al menos un número")
                    .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
                    .matches(/[a-z]/, "La contraseña debe tener al menos una minuscula"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben ser iguales").required("Es obligatorio la confirmación de contraseña"),
    name: yup.string().optional().max(20, "El nombre no puede ser de más de 20 caracteres")
})

export const loginSchema = yup.object({
    email: yup.string().email().typeError("Debe ingresar un mail valido").required(),
    password: yup.string().required()
                   
})