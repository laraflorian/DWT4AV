const http = require("http")

// request toda la informacion del cliente.
// response es lo que nosotros respondemos.
http.createServer( function(request, response){
    console.log("hola desde servidor")
    response.end("llego la solicitud")
}).listen(2025)