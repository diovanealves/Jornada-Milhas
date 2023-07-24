import { prisma } from '../lib/prisma'
import { IUser, IUserCreate, IUserUpdate } from '../models/User'

export class UserRepository {
  async create(userData: IUserCreate): Promise<IUserCreate> {
    return prisma.user.create({ data: userData })
  }

  async getAll(): Promise<IUser[]> {
    return prisma.user.findMany()
  }

  async getById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, userData: IUserUpdate): Promise<IUserUpdate> {
    return prisma.user.update({ where: { id }, data: userData })
  }

  async delete(id: string): Promise<IUser | null> {
    return prisma.user.delete({ where: { id } })
  }
}
