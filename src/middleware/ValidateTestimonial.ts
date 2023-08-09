import { Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'
import { idSchema } from '../models/Id'
import { ValidationError } from 'yup'

export async function ValidateTestimonialUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  const { description } = req.body

  try {
    await idSchema.validate({ id })

    const testimonial = await prisma.testimonial.findUnique({ where: { id } })

    if (!testimonial) {
      return res.status(404).json({ err: 'Depoimento não encontrado' })
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({ err: 'A descrição é obrigatória' })
    }

    next()
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ err: err.errors })
    }
    return res
      .status(500)
      .json({ err: 'Erro ao validar os campos do depoimento' })
  }
}
