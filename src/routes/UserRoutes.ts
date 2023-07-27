import express, { Request, Response } from 'express'
import { IUserCreate, IUserUpdate } from '../models/User'
import { UserService } from '../services/UserService'
import { UserRepository } from '../repository/UserRepository'
import {
  ValidateUserCreate,
  ValidateUserExists,
  ValidateUserUpdate,
} from '../middleware/ValidateUser'

const router = express.Router()
const userRepository = new UserRepository()
const userService = new UserService(userRepository)

router.post(
  '/usuario',
  ValidateUserCreate,
  async (req: Request, res: Response) => {
    const userData: IUserCreate = req.body
    try {
      const newUser = await userService.create(userData)
      return res.status(201).json(newUser)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao criar usuario.' })
    }
  },
)

router.get('/usuario', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll()
    return res.json(users)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter o usuário' })
  }
})

router.get(
  '/usuario/:id',
  ValidateUserExists,
  async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await userService.getById(id)
      return res.json(user)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao obter o usuário específico' })
    }
  },
)

router.put(
  '/usuario/:id',
  ValidateUserExists,
  ValidateUserUpdate,
  async (req: Request, res: Response) => {
    const { id } = req.params
    const userData: IUserUpdate = req.body
    try {
      const updatedUser = await userService.update(id, userData)
      return res.json(updatedUser)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao atualizar o usuário' })
    }
  },
)

router.delete(
  '/usuario/:id',
  ValidateUserExists,
  async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const deletedUser = await userService.delete(id)
      return res.json(deletedUser)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao deletar o usuário.' })
    }
  },
)

export default router
