import { prisma } from '../lib/prisma'
import { ITestimonial, ITestimonialCreate } from '../models/Testimonial'

export class TestimonialRepository {
  static async create(
    testimonialData: ITestimonialCreate,
  ): Promise<ITestimonialCreate> {
    return prisma.testimonial.create({
      data: testimonialData,
    })
  }

  static async getAll(): Promise<ITestimonial[]> {
    return prisma.testimonial.findMany({
      include: { user: true },
    })
  }

  static async getById(id: string): Promise<ITestimonial | null> {
    return prisma.testimonial.findUnique({
      where: { id },
      include: { user: true },
    })
  }
}
