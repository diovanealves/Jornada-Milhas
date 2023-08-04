import { Request, Response } from 'express'
import { TestimonialService } from '../services/TestimonialService'
import { ITestimonialCreate, ITestimonialUpdate } from '../models/Testimonial'

export default class TestimonialController {
  private testimonialService: TestimonialService

  constructor() {
    this.testimonialService = new TestimonialService()
  }

  async create(req: Request, res: Response) {
    const testimonialData: ITestimonialCreate = req.body

    try {
      const newTestimonial = await this.testimonialService.create(
        testimonialData,
      )
      return res.status(201).json(newTestimonial)
    } catch (err) {
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
      const testimonial = await this.testimonialService.getById(id)
      return res.json(testimonial)
    } catch (err) {
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
    const testimonialData: ITestimonialUpdate = req.body
    try {
      const updatedTestimonial = await this.testimonialService.update(
        id,
        testimonialData,
      )
      return res.json(updatedTestimonial)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao atualizar o depoimento' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const deletedTestimonial = await this.testimonialService.delete(id)
      return res.json(deletedTestimonial)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao deletar o depoimento' })
    }
  }
}
