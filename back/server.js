import express from "express"
import productosRoute from "./router/productos.router.js"
import productosApiRoute from "./api/routes/productos.api.routes.js"
import maquilladoresApiRoute from "./api/routes/maquilladores.api.routes.js"
import usuariosApiRoute from './api/routes/usuarios.api.routes.js'
import categoriasApiRoute from './api/routes/categorias.api.routes.js'
import proyectosApiRoute from './api/routes/proyectos.api.routes.js'
import comentariosApiRoute from './api/routes/comentarios.api.routes.js'
import multer from 'multer'
import sharp from "sharp"

import cors from 'cors'

const app = express();

const corsOption = {
    origin: '*',
    methods: "GET, POST, PUT, PATCH, DELETE"
}

app.use(cors())

app.use(express.urlencoded({ extended: true }) )
app.use(express.json())

app.use("/uploads", express.static("uploads"))
app.use(productosRoute)
app.use("/api/productos",productosApiRoute)
app.use("/api/maquilladores", maquilladoresApiRoute)
app.use("/api/usuarios", usuariosApiRoute)
app.use("/api/categorias", categoriasApiRoute)
app.use("/api/proyectos", proyectosApiRoute)
app.use("/api/comentarios", comentariosApiRoute)



app.listen(3333, () => console.log("funcionando"))