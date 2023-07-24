import { Request, Response, NextFunction } from 'express'

export function ValidateUser(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body

  if (!name || name.trim() === '') {
    return res.status(400).json({ err: 'O campo Nome e obrigatório' })
  }

  next()
}
