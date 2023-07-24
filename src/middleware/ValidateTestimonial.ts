import { Request, Response, NextFunction } from 'express'

export function ValidateTestimonial(
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
