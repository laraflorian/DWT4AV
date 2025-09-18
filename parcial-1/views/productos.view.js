import { crearPagina } from '../pages/utils.js'

export function crearListadoProductosPage(productos) {
    let html = "<ul>"
    productos.forEach(producto => {
        html += `<li>${producto.nombre} <a href="/productos/${producto.id}">Ver</a> 
                                        <a href="/productos/editar/${producto.id}">Editar</a>
                                        <a href="/productos/borrar/${producto.id}">Borrar</a>
                                        </li>`
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

export function formNuevoProducto() {
    let html = "<form action='/productos/nuevo' method='post'>";
    html += `
        <div>
            <div>
                <label for="nombre">Nombre</label>
                <input type="text" name="nombre">
            </div>
            <div>
                <label for="marca">Marca</label>
                <input type="text" name="marca">
            </div>
            <div>
                <label for="precio">Precio</label>
                <input type="number" name="precio">
            </div>
        </div>
        <div><input type="submit" value='Guardar'></div>
        `
    html += "</form>"
    html += `<a href="/productos">Volver</a>`;
    return crearPagina("Nuevo producto", html);
}

export function formEditarProducto(producto) {
    let html = `<form action='/productos/editar/${producto.id}' method='post'>`;
    html += `
        <div>
            <div>
                <label for="nombre">Nombre</label>
                <input type="text" name="nombre" value="${producto.nombre}">
            </div>
            <div>
                <label for="marca">Marca</label>
                <input type="text" name="marca" value="${producto.marca}">
            </div>
            <div>
                <label for="precio">Precio</label>
                <input type="number" name="precio" value="${producto.precio}">
            </div>
        </div>
        <div><input type="submit" value='Editar'></div>
        `;
    html += "</form>"
    html += `<a href="/productos">Volver</a>`;
    return crearPagina("Editando producto", html);
}

export function formBorrarProducto(producto) {
    let html = `<form action='/productos/borrar/${producto.id}' method='post'>`;
    html += `<div>
            <div>
                <h2>${producto.nombre}</h2>
            </div>
            <div>
            <p> ${producto.marca} </p>
            </div>
            <div>
             <p> ${producto.precio} </p>
            </div>
        </div>
        <div><input type="submit" value='Borrar'></div>
        `;
    html += "</form>"
    html += `<a href="/productos">Volver</a>`;
    return crearPagina("¿Borrar producto?", html);

}

export function borrarExito(id){
    let html = ""
    html += `<h2> Producto borrado correctamente </h2>
            <a href= "/productos">Volver</a>`;
    return crearPagina("Peoducto borrado", html);
}