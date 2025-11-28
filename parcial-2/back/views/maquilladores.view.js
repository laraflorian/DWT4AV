import { crearPagina } from '../pages/utils.js'

export function crearListadoMaquilladoresPage(maquilladores) {
    let html = "<div>"
    maquilladores.forEach(maquillador => {
        // html += '<li>'
        
        html += `<div class="d-flex align-items-center ps-5 border border-success-subtle">
                        <img src="${maquillador.foto}" alt="foto de ${maquillador.nombre}"  height="100px" width="100px" class="rounded border border-dark-subtle me-3 mb-3 mt-3">
                        <h2 class="pe-5">${maquillador.nombre} </h2>
                        <div class="pe-5" >
                        <p>Descripción de maquillador:</p>
                        <p>${maquillador.descripcion}</p>
                        </div>
                        <div>
                        <h3>Productos que usa:</h3>
                        <ul>`
                        maquillador.productos.forEach(producto => {
                            html += `<li>${producto.nombre}</li>`
                        })
                        
                       
         html+= ` </ul></div> </div>`   
                
    });
    html += "</div>"
    return crearPagina("Maquilladores", html);
}

// export function crearDetallePagina(maquillador) {
//     let html = ""
//     html += '<div class="d-flex ps-4 justify-content-center">'
//     html += `<p><img src="${producto.imagen}" alt="${producto.categoria} de ${producto.marca}"  height="400px" width="300px" class="rounded border border-dark-subtle"></p>`
//     html += '<div class="ps-5"> '
//     // html += `<p>Nombre: ${producto.nombre}</p>`
//     html += `<p>Categoría: ${producto.categoria}</p>`
//     html += `<p>Marca: ${producto.marca}</p>`
//     html += `<p>Precio estimado en pesos: $${producto.precio}</p>`
//     html += `<a href="${producto.link}" class="btn btn-outline-dark ms-5">Ver tienda oficial</a> </div>` 
//     html += '</div>'
//     html += `<div class="text-center d-grid gap-2 col-6 mx-auto"> <a href="/productos" class="btn btn-dark ms-5">Volver</a></div`
    
//     return crearPagina(producto.nombre, html)
// }

export function errorPagina() {
    let html = ""
    html += "<h2> No se encontrar la persona</h2>"
    html += `<a href="/maquilladores" class="btn btn-dark">Volver</a>`
    return crearPagina("Error 404", html);
}
