export function esAdmin(req, res, next){
    if(req.session?.role !== "admin") {
        return res.status(403).json({ message: "Acceso solo para administradores"})
    }
    next()
}