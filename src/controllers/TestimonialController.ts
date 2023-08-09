import { Request, Response } from 'express'
import { ValidationError } from 'yup'
import { TestimonialService } from '../services/TestimonialService'
import { ITestimonialCreate, ITestimonialUpdate } from '../models/Testimonial'
import { idSchema } from '../models/Id'

export default class TestimonialController {
  private testimonialService: TestimonialService

  constructor() {
    this.testimonialService = new TestimonialService()
  }

  async create(req: Request, res: Response) {
    const testimonialData = req.body

    try {
      await ITestimonialCreate.validate(testimonialData, {
        stripUnknown: true,
        abortEarly: true,
      })

      const newTestimonial = await this.testimonialService.create(
        testimonialData,
      )
      return res.status(201).json(newTestimonial)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      }
      return res.status(500).json({ err: 'Erro ao criar depoimento' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const testimonials = await this.testimonialService.getAll()
      return res.json(testimonials)
    } catch (err) {
      return res.status(500).send({ err: 'Erro ao obter os depoimentos' })
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    try {
      await idSchema.validate({ id })

      const testimonial = await this.testimonialService.getById(id)
      return res.json(testimonial)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      } else if (err instanceof Error) {
        return res.status(404).json({ err: err.message })
      }
      return res.status(500).json({ err: 'Erro ao obter o depoimento' })
    }
  }

  async getRandom(req: Request, res: Response) {
    try {
      const testimonials = await this.testimonialService.getRandom()
      return res.json(testimonials)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao obter os depoimentos' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const testimonialData = req.body
    try {
      await ITestimonialUpdate.validate(testimonialData, {
        stripUnknown: true,
        abortEarly: true,
      })

      const updatedTestimonial = await this.testimonialService.update(
        id,
        testimonialData,
      )
      return res.json(updatedTestimonial)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      }
      return res.status(500).json({ err: 'Erro ao atualizar o depoimento' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      await idSchema.validate({ id })

      const deletedTestimonial = await this.testimonialService.delete(id)

      if (!deletedTestimonial) {
        throw new Error('Depoimento não encontrado')
      }

      return res.json(deletedTestimonial)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      } else if (err instanceof Error) {
        return res.status(404).json({ err: err.message })
      }
      return res.status(500).json({ err: 'Erro ao obter o depoimento' })
    }
  }
}
