import express, { Request, Response } from 'express'
import { ITestimonialCreate } from '../models/Testimonial'
import { TestimonialService } from '../services/TestimonialService'

const router = express.Router()

router.post('/depoimentos', async (req: Request, res: Response) => {
  const testimonialData: ITestimonialCreate = req.body
  try {
    const newTestimonial = await TestimonialService.create(testimonialData)
    return res.status(201).json(newTestimonial)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao criar depoimento' })
  }
})

router.get('/depoimentos', async (req: Request, res: Response) => {
  try {
    const testimonials = await TestimonialService.getAll()
    return res.json(testimonials)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter os depoimentos' })
  }
})

router.get('/depoimentos/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const testimonial = await TestimonialService.getById(id)
    if (!testimonial) {
      return res.status(404).json({ err: 'Depoimento não encontrado' })
    }
    return res.json(testimonial)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter o depoimento' })
  }
})

router.get('/depoimentos-home', async (req: Request, res: Response) => {
  try {
    const testimonials = await TestimonialService.getRandom()
    return res.json(testimonials)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter os depoimentos' })
  }
})

export default router
