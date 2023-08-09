import { Testimonial } from '@prisma/client'
import { TestimonialRepository } from '../repository/TestimonialRepository'

export class TestimonialService {
  private testimonialRepository: TestimonialRepository

  constructor() {
    this.testimonialRepository = new TestimonialRepository()
  }

  async create(testimonialData: Testimonial): Promise<Testimonial> {
    return await this.testimonialRepository.create(testimonialData)
  }

  async getAll(): Promise<Testimonial[]> {
    return await this.testimonialRepository.getAll()
  }

  async getById(id: string): Promise<Testimonial | null> {
    const testimonial = await this.testimonialRepository.getById(id)

    if (!testimonial) {
      throw new Error('Depoimento não encontrado')
    }

    return testimonial
  }

  async getRandom(): Promise<Testimonial[]> {
    return await this.testimonialRepository.getRandom()
  }

  async update(
    id: string,
    testimonialData: Testimonial,
  ): Promise<Testimonial | null> {
    return await this.testimonialRepository.update(id, testimonialData)
  }

  async delete(id: string): Promise<Testimonial | null> {
    const testimonial = await this.testimonialRepository.getById(id)

    if (!testimonial) {
      throw new Error('Depoimento não encontrado')
    }

    return await this.testimonialRepository.delete(id)
  }
}
