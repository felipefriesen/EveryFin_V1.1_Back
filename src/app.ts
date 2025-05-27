import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth', authRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})
