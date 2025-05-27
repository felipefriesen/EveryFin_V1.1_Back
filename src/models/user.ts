export interface User {
  id: number
  email: string
  cpf: string
  passwordHash: string
}

export const users: User[] = []