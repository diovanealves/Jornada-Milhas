import { prisma } from '../lib/prisma'
import { IUser, IUserCreate, IUserUpdate } from '../models/User'

export class UserRepository {
  static async create(userData: IUserCreate): Promise<IUserCreate> {
    return prisma.user.create({ data: userData })
  }

  static async getAll(): Promise<IUser[]> {
    return prisma.user.findMany()
  }

  static async getById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  static async update(id: string, userData: IUserUpdate): Promise<IUserUpdate> {
    return prisma.user.update({ where: { id }, data: userData })
  }

  static async delete(id: string): Promise<IUser | null> {
    return prisma.user.delete({ where: { id } })
  }
}
