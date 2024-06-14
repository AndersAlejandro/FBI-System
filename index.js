import express from "express";
import { router as login } from "./routes/login.js";
import { router as casos } from "./routes/casos.js";

const app = express()

app.use(express.json())
app.use(express.static('static'))

app.use("/SignIn", login)
app.use("/Casos", casos)

app.listen(3000, (req, res) => {
    console.log('Servidor en el puerto 3000')
})
