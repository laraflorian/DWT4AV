import * as services from '../../services/usuarios.services.js'

export function createUser(req, res){
    services.createUser(req.body)
        .then( (usuario) => res.status(201).json(usuario) )
        .catch( err => res.status(400).json({ message: err.message }) )
}

export function login(req, res){
    services.login(req.body)
        .then( usuario => res.status(201).json(usuario) )
        .catch( err => res.status(400).json({ message: err.message }) )
}