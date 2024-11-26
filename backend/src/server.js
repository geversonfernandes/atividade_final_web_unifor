import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import path from 'path'
import { cwd } from 'process'
import invitedRoutes from './routes/invitedRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/invited', invitedRoutes)
app.use('/api/user', userRoutes)

app.use(express.static(path.resolve(cwd(), './frontend')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(cwd(), './frontend/index.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.resolve(cwd(), './frontend/register.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(cwd(), './frontend/login.html'))
})

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(cwd(), './frontend/home.html'))
})

app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
