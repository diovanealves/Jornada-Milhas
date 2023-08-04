import {
  ITestimonial,
  ITestimonialCreate,
  ITestimonialUpdate,
} from '../models/Testimonial'
import { TestimonialRepository } from '../repository/TestimonialRepository'

export class TestimonialService {
  private testimonialRepository: TestimonialRepository

  constructor() {
    this.testimonialRepository = new TestimonialRepository()
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
    return await this.testimonialRepository.getById(id)
  }

  async getRandom(): Promise<ITestimonial[]> {
    return await this.testimonialRepository.getRandom()
  }

  async update(
    id: string,
    testimonialData: ITestimonialUpdate,
  ): Promise<ITestimonialUpdate | null> {
    return await this.testimonialRepository.update(id, testimonialData)
  }

  async delete(id: string): Promise<ITestimonial | null> {
    return await this.testimonialRepository.delete(id)
  }
}
