import express from "express"

const app = express()

app.use(express.urlencoded({"extended": true}))
app.use(express.json() )
app.use("/home", express.static("public"))

app.get("/home", (req, res)=>{
    // va a leer un archivo que no tengo jajalol
})

app.get( "/:nombre", (req, res)=> {
    console.log("hola", req.params)
    res.send("HOLA ")
})

app.post("/", (req, res) => {
    console.log(req.body)
    res.send("HOLA BB")
})




app.listen(2025, () =>{
    console.log("funcionando")
})