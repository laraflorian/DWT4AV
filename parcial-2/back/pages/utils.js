function crearPagina(titulo, contenido) {
    let html = "";

    html = `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${titulo}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            
            </head>

            <body>
            <header>    
            <nav class="navbar bg-dark border-bottom border-body navbar-expand-lg" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Beauty</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" href="/productos">Todos los productos</a>
                        <a class="nav-link" href="/productos?categoria=labial">Labiales</a>
                        <a class="nav-link" href="/productos?categoria=ojos">Ojos</a>
                        <a class="nav-link" href="/productos?categoria=rubor">Rubor</a>
                        <a class="nav-link" href="/productos?categoria=faciales">Faciales</a>
                        <a class="nav-link" href="/productos/nuevo">Nuevo producto</a>
                        <a class="nav-link" href="/productos/maquilladores">Maquilladores</a>
                    </div>
                    </div>
                </div>
            </nav>
            </header>
            <main>
                <h1 class="text-center pt-3 pb-3"> ${titulo} </h1>
                ${contenido}
            </main>
            <footer class="pt-5">
            <p class="text-center"> Lara Florian </p>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
            </html>`
    return html
}

export { crearPagina }