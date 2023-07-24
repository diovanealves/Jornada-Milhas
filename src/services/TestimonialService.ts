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
    return this.testimonialRepository.create(testimonialData)
  }

  async getAll(): Promise<ITestimonial[]> {
    return this.testimonialRepository.getAll()
  }

  async getById(id: string): Promise<ITestimonial | null> {
    return this.testimonialRepository.getById(id)
  }

  async getRandom(): Promise<ITestimonial[]> {
    return this.testimonialRepository.getRandom()
  }

  async update(
    id: string,
    testimonialData: ITestimonialUpdate,
  ): Promise<ITestimonialUpdate | null> {
    const existingTestimonial = await this.getById(id)
    if (!existingTestimonial) {
      return null
    }

    return this.testimonialRepository.update(id, testimonialData)
  }

  async delete(id: string): Promise<ITestimonial | null> {
    const existingTestimonial = await this.getById(id)
    if (!existingTestimonial) {
      return null
    }

    return this.testimonialRepository.delete(id)
  }
}
