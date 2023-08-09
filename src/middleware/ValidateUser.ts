import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import { prisma } from '../lib/prisma'
import { idSchema } from '../models/Id'

export async function ValidateUserUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  const { name, image } = req.body

  try {
    await idSchema.validate({ id })

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(404).json({ err: 'Usuário não encontrado' })
    }

    if (name.trim() === '' && image.trim() === '') {
      return res.status(400).json({
        err: 'E necessários enviar pelo menos um campo para atualizar o usuário',
      })
    }

    req.body.name = name || user.name
    req.body.image = image || user.image

    next()
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ err: err.errors })
    }
    return res.status(500).json({ err: 'Erro ao validar os campos do usuario' })
  }
}
