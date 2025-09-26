import { crearPagina } from '../pages/utils.js'

export function crearListadoProductosPage(productos) {
    let html = "<div>"
    productos.forEach(producto => {
        // html += '<li>'
        
        html += `<div class="d-flex align-items-end ps-5 border border-success-subtle">
                        <p class="flex-grow-1">${producto.nombre} </p>
                        
                        <div class="pe-5">
                            <a href="/productos/${producto._id}" class="btn btn-outline-secondary ms-3 mt-2 mb-2 me-3">Ver</a> 
                            <a href="/productos/editar/${producto._id}" class="btn btn-outline-secondary ms-3 mt-2 mb-2 me-3">Editar</a>
                            <a href="/productos/borrar/${producto._id}" class="btn btn-outline-secondary ms-3 mt-2 mb-2 me-3">Borrar</a>
                        </div>
                </div>
                `
    });
    html += "</div>"
    return crearPagina("Productos", html);
}

export function crearDetallePagina(producto) {
    let html = ""
    html += '<div class="d-flex ps-4 justify-content-center">'
    html += `<p><img src="${producto.imagen}" alt="${producto.categoria} de ${producto.marca}"  height="400px" width="300px" class="rounded border border-dark-subtle"></p>`
    html += '<div class="ps-5"> '
    // html += `<p>Nombre: ${producto.nombre}</p>`
    html += `<p>Categoría: ${producto.categoria}</p>`
    html += `<p>Marca: ${producto.marca}</p>`
    html += `<p>Precio estimado en pesos: $${producto.precio}</p>`
    html += `<a href="${producto.link}" class="btn btn-outline-dark ms-5">Ver tienda oficial</a> </div>` 
    html += '</div>'
    html += `<div class="text-center d-grid gap-2 col-6 mx-auto"> <a href="/productos" class="btn btn-dark ms-5">Volver</a></div`
    
    return crearPagina(producto.nombre, html)
}

export function errorPagina() {
    let html = ""
    html += "<h2> No se encontro el producto</h2>"
    html += `<a href="/productos" class="btn btn-dark">Volver</a>`
    return crearPagina("Error 404", html);
}

export function formNuevoProducto() {
    let html = `<form action='/productos/nuevo' method='post' class="ps-5 pe-5">`;
    html += `
        <div>
            <div class="pt-4">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" name="nombre">
            </div>
            <div  class="pt-4">
                <label for="marca">Marca</label>
                <input type="text" class="form-control" name="marca">
            </div>
            <div  class="pt-4">
                <label for="categoria">Categoría</label>
                <select name="categoria" class="form-select form-select-sm">
                    <option value="labial">Labial</option>
                    <option value="ojos">Ojos</option>
                    <option value="rubor">Rubor</option>
                    <option value="faciales">Faciales</option>
                </select>
            </div>
            <div  class="pt-4">
                <label for="precio">Precio</label>
                <input type="number" name="precio" class="form-control">
            </div>
            <div  class="pt-4">
                <label for="imagen">Link de imagen</label>
                <input type="text" name="imagen" class="form-control">
                <label for="link">Link del sitio</label>
                <input type="text" name="link" class="form-control">
            </div>
        </div>
        <div class="mb-4 mt-4 ms-4"><input type="submit" value='Guardar'class="btn btn-success d-grid gap-2 col-6 mx-auto"></div>
        `
    html += "</form>"
    html += `<div class="d-grid gap-2 col-6 mx-auto"> <a href="/productos" class="btn btn-dark ms-5">Volver</a></div`;
    return crearPagina("Nuevo producto", html);
}

export function formEditarProducto(producto) {
    let html = `<form action='/productos/editar/${producto._id}' method='post' class="ps-5 pe-5"> `;
    html += `
        <div>
            <div class="pt-4">
                <label for="nombre">Nombre</label>
                <input type="text" name="nombre" value="${producto.nombre}" class="form-control">
            </div>
            <div class="pt-4">
                <label for="marca">Marca</label>
                <input type="text" name="marca" value="${producto.marca}" class="form-control">
            </div>
            <div class="pt-4">
                <label for="categoria">Categoría</label>
                <select name="categoria" class="form-select form-select-sm">
                    <option value="labial">Labial</option>
                    <option value="ojos">Ojos</option>
                    <option value="rubor">Rubor</option>
                    <option value="faciales">Faciales</option>
                </select>
            </div>
            <div class="pt-4">
                <label for="precio">Precio</label>
                <input type="number" name="precio" value="${producto.precio}" class="form-control">
            </div>
            <div class="pt-4">
                <label for="imagen">Link de imagen</label>
                <input type="text" name="imagen" class="form-control" value="${producto.imagen}">
                <label for="link">Link del sitio</label>
                <input type="text" name="link" class="form-control" value="${producto.link}">
            </div>
        </div>
        <div class="mb-4 mt-4 ms-4"><input type="submit" value='Editar'class="btn btn-success d-grid gap-2 col-6 mx-auto"></div>
        `;
    html += "</form>"
    html += `<div class="text-center d-grid gap-2 col-6 mx-auto"> <a href="/productos" class="btn btn-dark ms-5">Volver</a></div`;
    return crearPagina("Editando producto", html);
}

export function formBorrarProducto(producto) {
    let html = `<form action='/productos/borrar/${producto._id}' method='post'>`;
    html += `<div class="text-center">
            <div>
                <h2>${producto.nombre}</h2>
            </div>
            <div>
            <p> Marca ${producto.marca} </p>
            </div>
            <div>
             <p> Precio $${producto.precio} </p>
            </div>
        </div>

        <div class="mb-4 mt-4 ms-4"><input type="submit" value='Borrar'class="btn btn-danger d-grid gap-2 col-6 mx-auto"></div>

        `;
    html += "</form>"
    html += `<div class="text-center d-grid gap-2 col-6 mx-auto"> <a href="/productos" class="btn btn-dark ms-5">Volver</a></div`;
    return crearPagina("¿Borrar producto?", html);

}

export function borrarExito(_id){
    let html = ""
    html += `<h2 class="text-center"> Producto borrado correctamente </h2>
            <div class="text-center d-grid gap-2 col-6 mx-auto"> <a href="/productos" class="btn btn-dark ms-5">Volver</a></div`;
    return crearPagina("Peoducto borrado", html);
}