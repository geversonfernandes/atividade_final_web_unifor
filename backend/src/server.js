import express from 'express'

const app = express()

const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Express!')
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
