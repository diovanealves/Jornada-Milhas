import { IUser, IUserCreate, IUserUpdate } from '../models/User'
import { UserRepository } from '../repository/UserRepository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async create(userData: IUserCreate): Promise<IUserCreate> {
    return await this.userRepository.create(userData)
  }

  async getAll(): Promise<IUser[]> {
    return await this.userRepository.getAll()
  }

  async getById(id: string): Promise<IUser | null> {
    return await this.userRepository.getById(id)
  }

  async update(id: string, userData: IUserUpdate): Promise<IUserUpdate | null> {
    const existingUser = await this.getById(id)
    if (!existingUser) {
      return null
    }

    return await this.userRepository.update(id, userData)
  }

  async delete(id: string): Promise<IUser | null> {
    const existingUser = await this.getById(id)
    if (!existingUser) {
      return null
    }

    return await this.userRepository.delete(id)
  }
}
