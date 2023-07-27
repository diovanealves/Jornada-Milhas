import { Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'
import { IUser } from '../models/User'

type CustomRequest = Request & { user?: IUser }

export function ValidateUserCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.body

  if (!name || name.trim() === '') {
    return res.status(400).json({ err: 'O campo Nome e obrigatório' })
  }

  next()
}

export async function ValidateUserExists(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } })

    if (!existingUser) {
      return res.status(404).json({ err: 'Usuário não encontrado' })
    }

    req.user = existingUser
    next()
  } catch (err) {
    return res
      .status(500)
      .json({ err: 'Erro ao verificar se o usuario existe' })
  }
}
