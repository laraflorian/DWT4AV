import yup from 'yup'

export const productosSchema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
    marca: yup.string().required("La marca es obligatoria").min(3, "La marca debe tener al menos 3 caracteres"),
    categoria: yup.string().required("La categoría es obligatoria"),
    precio: yup.number().typeError("El precio debe ser un número").required("El precio es necesario").positive("El precio debe ser positivo"),
    imagen: yup.string().optional(),
    link: yup.string().optional(),
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{24}$/, "No es un id de mongo db")
})