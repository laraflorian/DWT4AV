function crearPagina(titulo, contenido) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += "<h1>" + titulo + "</h1>"
    html += '<title>' + titulo + '</title>'
    html += '</head><body>'
    html += contenido
    html += "</body></html>"

    return html
}

export{crearPagina}