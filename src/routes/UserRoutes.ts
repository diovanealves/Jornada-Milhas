import express, { Request, Response } from 'express'
import { IUserCreate, IUserUpdate } from '../models/User'
import { UserService } from '../services/UserService'

const router = express.Router()

router.post('/usuario', async (req: Request, res: Response) => {
  const userData: IUserCreate = req.body
  try {
    const newUser = await UserService.create(userData)
    return res.status(201).json(newUser)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao criar usuario.' })
  }
})

router.get('/usuario', async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll()
    return res.json(users)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter o usuário' })
  }
})

router.get('/usuario/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await UserService.getById(id)
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
    const updatedUser = await UserService.update(id, userData)
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
    const deletedUser = await UserService.delete(id)
    if (!deletedUser) {
      return res.status(404).json({ err: 'Usuário não encontrado' })
    }
    return res.json(deletedUser)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao deletar o usuário.' })
  }
})

export default router
