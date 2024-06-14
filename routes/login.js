import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { results } from '../data/agentes.js'

const router = Router()



router.post("/", async (req, res) => {
    const payload = req.body

    const agenteExistente = results.find(agente => agente.email == payload.email && agente.password == payload.password)

    const secretKey = process.env.JWT_SECRET

    if (agenteExistente) {
        let tokenAgente = {
            email: agenteExistente.email
        }
        const token = jwt.sign(tokenAgente, secretKey, {
            expiresIn: 120
        });
        res.json({
            html: `
            <h1>Bienvenido</h1>
            <p>${agenteExistente.email}</p>
            <a href="/Casos">Ver Casos</a>`,
            token: token
        });
    } else {
        res.status(401).send('Credenciales invalidas.')
    }
});

export { router }
