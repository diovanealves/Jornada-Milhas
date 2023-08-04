import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { IUserCreate, IUserUpdate } from '../models/User'

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async create(req: Request, res: Response) {
    const userData: IUserCreate = req.body
    try {
      const newUser = await this.userService.create(userData)
      return res.status(201).json(newUser)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao criar usuario.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userService.getAll()
      return res.json(users)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao obter o usuário' })
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const user = await this.userService.getById(id)
      return res.json(user)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao obter o usuário específico' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const userData: IUserUpdate = req.body
    try {
      const updatedUser = await this.userService.update(id, userData)
      return res.json(updatedUser)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao atualizar o usuário' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const deletedUser = await this.userService.delete(id)
      return res.json(deletedUser)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao deletar o usuário.' })
    }
  }
}
