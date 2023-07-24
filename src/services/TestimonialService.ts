import { ITestimonial, ITestimonialCreate } from '../models/Testimonial'
import { TestimonialRepository } from '../repository/TestimonialRepository'

export class TestimonialService {
  static async create(
    testimonialData: ITestimonialCreate,
  ): Promise<ITestimonialCreate> {
    return TestimonialRepository.create(testimonialData)
  }

  static async getAll(): Promise<ITestimonial[]> {
    return TestimonialRepository.getAll()
  }

  static async getById(id: string): Promise<ITestimonial | null> {
    return TestimonialRepository.getById(id)
  }

  static async getRandom(): Promise<ITestimonial[]> {
    return TestimonialRepository.getRandom()
  }
}
