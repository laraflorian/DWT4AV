import multer from 'multer'
import sharp from "sharp"
import fs from 'fs'

// Para subir las fotos de perfil 
const storage = multer.memoryStorage({
    // destination: (req, file, cb) => cb(null, "uploads/"),
    // filename: (req, file, cb) => cb(null, file.originalname.trim().replace(" ", "_"))
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Tipo de archivo no soportado"), false)
    }
}

export const upload = multer({ storage: storage, fileFilter: fileFilter })


export async function resizeImage(req, res, next) {

    if (!req.file) {
        return res.status(400).json({ message: "No se envió ningún archivo." })
    }
    const outputPath = "uploads/" + Date.now() + ".webp"

    try {
        await sharp(req.file.buffer)
            .resize(300)
            .webp()
            .toFile(outputPath)


        const filename = outputPath.split("/").pop()
        req.file.filename = filename
        next()
    } catch ( error ) {
        console.error(error)
        res.status(500).json({ message: "Error al procesar la imagen." })
    }

    // return sharp(req.file.path)
    //     .resize(300)
    //     .webp()
    //     .toFile( "uploads/" + (new Date()).getTime() + ".webp" )
    //     .then( () => next() )
    //     .catch( () => res.status(500).json({message: "No se pudo cargar la imagen."}))
}

// const upload = multer({ storage: storage, fileFilter: fileFilter })
