import yup from 'yup'

export const proyectosSchema = yup.object({
    nombre: yup.string().required("El nombre es necesario"),
    descripcion: yup.string().optional(),
    productos: yup.array().of(yup.string()).optional()
})