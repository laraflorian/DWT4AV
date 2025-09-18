function crearPagina(titulo, contenido) {
    let html = ""
    // html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    // html += '<title>' + titulo + '</title>'
    // html += '</head><body>'
    // html += `<a href="/productos"> Todos los productos</a> | <a href="/productos/nuevo">  Nuevo producto</a>`
    // html += "<h1>" + titulo + "</h1>"
    // html += contenido
    // html += "</body></html>"

    html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${titulo}</title>
                // Link a boostrap o css propio
            </head>
            <body>
            <header>
                <a href="/productos"> Todos los productos</a> | <a href="/productos/nuevo">  Nuevo producto</a>
            </header>
            <main>
                <h1> ${titulo} </h1>
                ${contenido}
            </main>
            <footer>
            // Agregar contenido de fin de página
            </footer>
            </body>
            </html>`
    return html
}

export { crearPagina }