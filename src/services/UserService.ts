import { User } from '@prisma/client'
import { UserRepository } from '../repository/UserRepository'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async create(userData: User): Promise<User> {
    return await this.userRepository.create(userData)
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll()
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return user
  }

  async update(id: string, userData: User): Promise<User | null> {
    return await this.userRepository.update(id, userData)
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return await this.userRepository.delete(id)
  }
}
