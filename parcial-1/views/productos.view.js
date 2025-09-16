export function crearPagina(titulo, contenido) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += "<h1>" + titulo + "</h1>"
    html += '<title>' + titulo + '</title>'
    html += '</head><body>'
    html += contenido
    html += "</body></html>"

    return html
}

export function crearListadoProductosPage(productos) {
    let html = "<ul>"
    productos.forEach(producto => {
        html += `<li>${producto.nombre} <a href="/productos/${producto.id}">Ver</a> </li>`
    });
    html += "</ul>"
    return crearPagina("Productos", html);
}

export function crearDetallePagina(producto) {
    let html = ""
    html += "<ul>"
    html += `<li>Nombre: ${producto.nombre}</li>`
    html += `<li>Marca: ${producto.marca}</li>`
    html += `<li>Precio: ${producto.precio}</li>`
    html += "</ul>"
    html += `<a href="/productos">Volver</a>`
    return crearPagina(producto.nombre, html)
}

export function errorPagina() {
    let html = ""
    html += "<h2> No se encontro el producto</h2>"
    html += `<a href="/">Volver</a>`
    return crearPagina("Error 404", html);

}