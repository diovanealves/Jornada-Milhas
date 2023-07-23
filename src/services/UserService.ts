import { IUser, IUserCreate, IUserUpdate } from '../models/User'
import { UserRepository } from '../repository/UserRepository'

export class UserService {
  static async create(userData: IUserCreate): Promise<IUserCreate> {
    return UserRepository.create(userData)
  }

  static async getAll(): Promise<IUser[]> {
    return UserRepository.getAll()
  }

  static async getById(id: string): Promise<IUser | null> {
    return UserRepository.getById(id)
  }

  static async update(
    id: string,
    userData: IUserUpdate,
  ): Promise<IUserUpdate | null> {
    const existingUser = await UserRepository.getById(id)
    if (!existingUser) {
      return null
    }

    return UserRepository.update(id, userData)
  }

  static async delete(id: string): Promise<IUser | null> {
    const existingUser = await UserRepository.getById(id)
    if (!existingUser) {
      return null
    }

    return UserRepository.delete(id)
  }
}
