import { Request, Response } from 'express'
import { ValidationError } from 'yup'
import { UserService } from '../services/UserService'
import { IUserCreate, IUserUpdate } from '../models/User'
import { idSchema } from '../models/Id'

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async create(req: Request, res: Response) {
    const userData = req.body
    try {
      await IUserCreate.validate(userData, {
        stripUnknown: true,
        abortEarly: false,
      })

      const newUser = await this.userService.create(userData)
      return res.status(201).json(newUser)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      }
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
      await idSchema.validate({ id })

      const user = await this.userService.getById(id)
      return res.json(user)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      } else if (
        err instanceof Error &&
        err.message === 'Usuário não encontrado'
      ) {
        return res.status(404).json({ err: err.message })
      }
      return res.status(500).json({ err: 'Erro ao obter o usuário específico' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const userData = req.body
    try {
      await IUserUpdate.validate(userData, {
        stripUnknown: true,
        abortEarly: false,
      })

      const updatedUser = await this.userService.update(id, userData)
      return res.json(updatedUser)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      }
      return res.status(500).json({ err: 'Erro ao atualizar o usuário' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      await idSchema.validate({ id })

      const deletedUser = await this.userService.delete(id)
      return res.json(deletedUser)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      } else if (
        err instanceof Error &&
        err.message === 'Usuário não encontrado'
      ) {
        return res.status(404).json({ err: err.message })
      }
      return res.status(500).json({ err: 'Erro ao deletar o usuário.' })
    }
  }
}
