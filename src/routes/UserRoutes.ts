import express, { Request, Response } from 'express'
import { IUserCreate, IUserUpdate } from '../models/User'
import { UserService } from '../services/UserService'
import { UserRepository } from '../repository/UserRepository'
import { ValidateUser } from '../middleware/ValidateUser'

const router = express.Router()
const userRepository = new UserRepository()
const userService = new UserService(userRepository)

router.post('/usuario', ValidateUser, async (req: Request, res: Response) => {
  const userData: IUserCreate = req.body
  try {
    const newUser = await userService.create(userData)
    return res.status(201).json(newUser)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao criar usuario.' })
  }
})

router.get('/usuario', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll()
    return res.json(users)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter o usuário' })
  }
})

router.get('/usuario/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await userService.getById(id)
    if (!user) {
      return res.status(404).json({ err: 'Usuário não encontrado' })
    }
    return res.json(user)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter o usuário' })
  }
})

router.put('/usuario/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const userData: IUserUpdate = req.body
  try {
    const updatedUser = await userService.update(id, userData)
    if (!updatedUser) {
      return res.status(404).json({ err: 'Usuário não encontrado' })
    }
    return res.json(updatedUser)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao atualizar o usuário' })
  }
})

router.delete('/usuario/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedUser = await userService.delete(id)
    if (!deletedUser) {
      return res.status(404).json({ err: 'Usuário não encontrado' })
    }
    return res.json(deletedUser)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao deletar o usuário.' })
  }
})

export default router
