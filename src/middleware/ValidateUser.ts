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

export async function ValidateUserUpdate(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { name, image } = req.body

  try {
    const existingUser = req.user

    if (name.trim() === '' && image.trim() === '') {
      return res.status(400).json({
        err: 'E necessários enviar pelo menos um campo para atualizar o usuário',
      })
    }

    if (!name || name.trim() === '') {
      req.body.name = existingUser?.name
    }

    if (!image || image.trim() === '') {
      req.body.image = existingUser?.image
    }

    next()
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao validar os campos do usuario' })
  }
}
