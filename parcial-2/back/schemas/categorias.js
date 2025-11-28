import * as yup from 'yup'

export const categoriasSchema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio."),
    descripcion: yup.string().optional(),
})

