import { NextFunction, Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import * as yup from 'yup'

const idSchema = yup.object({
  id: yup.string().uuid('Precisa ser um ID válido').required(),
})

export async function ValidateDestinationUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  const { name, price, imagesUrl } = req.body

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
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ err: err.errors })
    }
    return res.status(500).json({ err: 'Erro ao atualizar destino' })
  }
}
