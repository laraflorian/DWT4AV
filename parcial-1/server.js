import express from "express"
import productosRoute from "./router/productos.router.js"
import prodcutosApiRoute from "./api/routes/productos.api.routes.js"

const app = express()

app.use(express.urlencoded({ extended: true }) )
app.use( express.json())
app.use(productosRoute)
app.use("/api/productos",prodcutosApiRoute)

app.listen(3333, () => console.log("funcionando"))