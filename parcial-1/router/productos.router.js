import express from "express"
import * as controller from '../controllers/productos.controller.js'

const route = express.Router()

route.get("/productos", controller.getProductos)
route.get("/productos/:id", controller.getProductoPorId)

export default route