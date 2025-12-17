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

export function getMiPerfil(req, res){
    services.getMiPerfil(req.session._id)
        .then(user => res.status(200).json(user) )
        .catch( err => res.status(400).json({ message: err.message}) )
}

export function actualizarPerfil(req, res){
    services.actualizarPerfil(req.session._id, req.body)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({message: err.message}))
}

export function actualizarAvatar(req, res){
    const avatar = req.file.filename

    services.actualizarPerfil(req.session._id, {avatar})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ message: err.message }))
}