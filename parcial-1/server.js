import express from "express"
import productosRoute from "./router/productos.router.js"

const app = express()

app.use(productosRoute)
app.listen(3333, () => console.log("funcionando"))