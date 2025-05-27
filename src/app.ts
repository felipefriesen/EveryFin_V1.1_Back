import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import transactionsRouter from './routes/transactions';
import dashboardRouter from './routes/dashboard';
import reportsRouter from './routes/reports';

dotenv.config()

const app = express()
app.use(express.json())
import cors from 'cors'
app.use(cors({ origin: 'http://localhost:5175', credentials: true }))
import cors from 'cors'
app.use(cors({
  origin: 'http://localhost:5175',  // porta padrão do Vite
  credentials: true
}))

app.use('/auth', authRouter)

app.use('/transactions', transactionsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/reports', reportsRouter);


const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})