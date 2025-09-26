import express from "express"
import * as controller from '../controllers/productos.controller.js';
import * as controllerM from '../controllers/maquilladores.controller.js'

const route = express.Router()

route.get("/productos/maquilladores", controllerM.getMaquilladores)
route.get("/productos", controller.getProductos)
route.get("/productos/nuevo", controller.formNuevoProducto)
route.post("/productos/nuevo", controller.guardarProducto)
route.get("/productos/editar/:id", controller.formEditarProducto)
route.post("/productos/editar/:id", controller.editarProducto)
route.get("/productos/borrar/:id", controller.formBorrarProducto)
route.post("/productos/borrar/:id", controller.borrarProducto)
route.get("/productos/:id", controller.getProductoPorId)




export default route