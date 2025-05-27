import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { users, User } from '../models/user'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
let nextId = 1

export const register = async (req: Request, res: Response) => {
  const { email, cpf, password } = req.body
  if (!email || !cpf || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' })
  }
  const exists = users.find(u => u.email === email)
  if (exists) {
    return res.status(409).json({ message: 'Usuário já existe' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user: User = { id: nextId++, email, cpf, passwordHash }
  users.push(user)
  return res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' })
  }
  const user = users.find(u => u.email === email)
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }
  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) {
    return res.status(401).json({ message: 'Credenciais inválidas' })
  }
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
  return res.status(200).json({ token })
}
