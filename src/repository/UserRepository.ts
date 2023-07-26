import { prisma } from '../lib/prisma'
import { IUser, IUserCreate, IUserUpdate } from '../models/User'

export class UserRepository {
  async create(userData: IUserCreate): Promise<IUserCreate> {
    return await prisma.user.create({ data: userData })
  }

  async getAll(): Promise<IUser[]> {
    return await prisma.user.findMany()
  }

  async getById(id: string): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, userData: IUserUpdate): Promise<IUserUpdate> {
    return await prisma.user.update({ where: { id }, data: userData })
  }

  async delete(id: string): Promise<IUser | null> {
    return await prisma.user.delete({ where: { id } })
  }
}
