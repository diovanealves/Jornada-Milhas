import { Request, Response, NextFunction } from 'express'
import { ITestimonial } from '../models/Testimonial'
import { prisma } from '../lib/prisma'

type CustomRequest = Request & { testimonial?: ITestimonial }

export function ValidateTestimonialCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { description, userId } = req.body

  if (!description || description.trim() === '') {
    return res.status(400).json({ err: 'O campo Descrição e obrigatório' })
  }

  if (!userId || userId.trim() === '') {
    return res.status(400).json({ err: 'O campo userId e obrigatório' })
  }

  next()
}

export async function ValidateTestimonialExists(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params

  try {
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    })

    if (!existingTestimonial) {
      return res.status(404).json({ err: 'Depoimento não encontrado' })
    }

    req.testimonial = existingTestimonial
    next()
  } catch (err) {
    return res
      .status(500)
      .json({ err: 'Erro ao verificar se o depoimento existe' })
  }
}

export async function ValidateTestimonialUpdate(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const { description } = req.body

  try {
    if (!description || description.trim() === '') {
      return res.status(400).json({
        err: 'E necessário enviar a descrição para atualizar o depoimento',
      })
    }

    next()
  } catch (err) {
    return res
      .status(500)
      .json({ err: 'Erro ao validar os campos do depoimento' })
  }
}
