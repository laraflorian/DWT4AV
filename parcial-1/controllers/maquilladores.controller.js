import * as service from "../services/maquilladores.services.js";
import * as views from "../views/maquilladores.view.js";

// export function getMaquilladores(req, res) {
//     // const { categoria } = req.query
//     service.getMaquilladores().then((maquilladores) => {
//         res.send(views.crearListadoMaquilladoresPage(maquilladores));
//     });
// }
export function getMaquilladores(req, res) {
    service.getMaquilladores().then((maquilladores) => {
        console.log("Maquilladores encontrados:", maquilladores) // <-- debug
        res.send(views.crearListadoMaquilladoresPage(maquilladores));
    }).catch(err => {
        console.error("Error al traer maquilladores", err)
        res.status(500).send("Error en el servidor")
    })
}