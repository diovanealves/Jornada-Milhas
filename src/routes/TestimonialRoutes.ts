import express, { Request, Response } from 'express'
import { ITestimonialCreate, ITestimonialUpdate } from '../models/Testimonial'
import { TestimonialService } from '../services/TestimonialService'
import { TestimonialRepository } from '../repository/TestimonialRepository'
import { ValidateTestimonial } from '../middleware/ValidateTestimonial'

const router = express.Router()
const testimonialRepository = new TestimonialRepository()
const testimonialService = new TestimonialService(testimonialRepository)

router.post(
  '/depoimentos',
  ValidateTestimonial,
  async (req: Request, res: Response) => {
    const testimonialData: ITestimonialCreate = req.body

    try {
      const newTestimonial = await testimonialService.create(testimonialData)
      return res.status(201).json(newTestimonial)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao criar depoimento' })
    }
  },
)

router.get('/depoimentos', async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialService.getAll()
    return res.json(testimonials)
  } catch (err) {
    return res.status(500).send({ err: 'Erro ao obter os depoimentos' })
  }
})

router.get('/depoimentos/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const testimonial = await testimonialService.getById(id)
    return res.json(testimonial)
  } catch (err) {
    if ((err as Error).message === 'Depoimento não encontrado') {
      return res.status(404).json({ err: 'Depoimento não encontrado' })
    } else {
      return res.status(500).json({ err: 'Erro ao obter o depoimento' })
    }
  }
})

router.get('/depoimentos-home', async (req: Request, res: Response) => {
  try {
    const testimonials = await testimonialService.getRandom()
    return res.json(testimonials)
  } catch (err) {
    return res.status(500).json({ err: 'Erro ao obter os depoimentos' })
  }
})

router.put('/depoimentos/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const testimonialData: ITestimonialUpdate = req.body
  try {
    const updatedTestimonial = await testimonialService.update(
      id,
      testimonialData,
    )
    return res.json(updatedTestimonial)
  } catch (err) {
    if ((err as Error).message === 'Depoimento não encontrado') {
      return res.status(404).json({ err: 'Depoimento não encontrado' })
    } else {
      return res.status(500).json({ err: 'Erro ao atualizar o depoimento' })
    }
  }
})

router.delete('/depoimentos/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedTestimonial = await testimonialService.delete(id)
    return res.json(deletedTestimonial)
  } catch (err) {
    if ((err as Error).message === 'Depoimento não encontrado') {
      return res.status(404).json({ err: 'Depoimento não encontrado' })
    } else {
      return res.status(500).json({ err: 'Erro ao deletar o depoimento' })
    }
  }
})

export default router
