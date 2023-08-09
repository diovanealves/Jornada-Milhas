import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import { prisma } from '../lib/prisma'
import { idSchema } from '../models/Id'

export async function ValidateDestinationUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  const { name, price, imagesUrl } = req.body

  if (!name && !price && imagesUrl.length === 0) {
    return res.status(400).json({
      err: 'Pelo menos um campo precisa ser preenchido para atualizar o destino',
    })
  }

  try {
    await idSchema.validate({ id })

    const destination = await prisma.destinations.findUnique({ where: { id } })
    if (!destination) {
      return res.status(404).json({ err: 'Destino não encontrado' })
    }

    req.body.name = name || destination?.name
    req.body.price = price || destination?.price
    req.body.imagesUrl =
      imagesUrl && imagesUrl.length > 0 && imagesUrl[0] === ''
        ? destination?.imagesUrl
        : imagesUrl

    next()
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ err: err.errors })
    }
    return res.status(500).json({ err: 'Erro ao atualizar destino' })
  }
}
