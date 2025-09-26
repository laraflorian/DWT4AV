import express from "express"
import productosRoute from "./router/productos.router.js"
import productosApiRoute from "./api/routes/productos.api.routes.js"
import maquilladoresApiRoute from "./api/routes/maquilladores.api.routes.js"

const app = express()

app.use(express.urlencoded({ extended: true }) )
app.use(express.json())
app.use(productosRoute)
app.use("/api/productos",productosApiRoute)
app.use("/api/maquilladores", maquilladoresApiRoute)

app.listen(3333, () => console.log("funcionando"))