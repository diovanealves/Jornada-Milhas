import {
  ITestimonial,
  ITestimonialCreate,
  ITestimonialUpdate,
} from '../models/Testimonial'
import { TestimonialRepository } from '../repository/TestimonialRepository'

export class TestimonialService {
  private testimonialRepository: TestimonialRepository

  constructor(testimonialRepository: TestimonialRepository) {
    this.testimonialRepository = testimonialRepository
  }

  async create(
    testimonialData: ITestimonialCreate,
  ): Promise<ITestimonialCreate> {
    return await this.testimonialRepository.create(testimonialData)
  }

  async getAll(): Promise<ITestimonial[]> {
    return await this.testimonialRepository.getAll()
  }

  async getById(id: string): Promise<ITestimonial | null> {
    const existingTestimonial = await this.testimonialRepository.getById(id)

    if (!existingTestimonial) {
      throw new Error('Depoimento não encontrado')
    }

    return existingTestimonial
  }

  async getRandom(): Promise<ITestimonial[]> {
    return await this.testimonialRepository.getRandom()
  }

  async update(
    id: string,
    testimonialData: ITestimonialUpdate,
  ): Promise<ITestimonialUpdate | null> {
    const existingTestimonial = await this.getById(id)

    if (!existingTestimonial) {
      throw new Error('Depoimento não encontrado')
    }

    return await this.testimonialRepository.update(id, testimonialData)
  }

  async delete(id: string): Promise<ITestimonial | null> {
    const existingTestimonial = await this.getById(id)

    if (!existingTestimonial) {
      throw new Error('Depoimento não encontrado')
    }

    return await this.testimonialRepository.delete(id)
  }
}
