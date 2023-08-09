import { User } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class UserRepository {
  async create(userData: User): Promise<User> {
    return await prisma.user.create({ data: userData })
  }

  async getAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async getById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, userData: User): Promise<User> {
    return await prisma.user.update({ where: { id }, data: userData })
  }

  async delete(id: string): Promise<User | null> {
    return await prisma.user.delete({ where: { id } })
  }
}
