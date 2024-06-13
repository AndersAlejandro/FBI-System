const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const agentes = require('./data/agentes.js')

app.use(express.json())
app.listen(3000, (req, res) => {
    console.log('Servidor en el puerto 3000')
})

const secretKey = process.env.JWT_SECRET

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/SignIn', (req, res) => {
    const payload = req.body

    const agenteExistente = agentes.results.find(agente => agente.email == payload.email && agente.password == payload.password)
    if (agenteExistente) {
        let tokenAgente = {
            email: agenteExistente.email
        }
        console.log(tokenAgente)
        const token = jwt.sign(tokenAgente, secretKey, {
            expiresIn: '120'
        });
        console.log(token);
        res.send(
            `<h1>Bienvenido</h1>
        <p>${agenteExistente.email}</p>
        <script>sessionStorage.setItem('token', JSON.stringify("${token}"))</script>`
        );
    } else {
        res.status(401).send('Credenciales invalidas.')
    }
});
