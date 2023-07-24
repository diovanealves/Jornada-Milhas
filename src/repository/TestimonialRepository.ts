import { prisma } from '../lib/prisma'
import {
  ITestimonial,
  ITestimonialCreate,
  ITestimonialUpdate,
} from '../models/Testimonial'

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

  static async getRandom(): Promise<ITestimonial[]> {
    return prisma.$queryRaw<ITestimonial[]>`
    SELECT
    T.*,
    json_build_object('id', u.id, 'name', u.name, 'image', u.image) as user
    FROM "Testimonial" as T
    JOIN "User" as U ON T."userId" = U."id"
    ORDER BY RANDOM()
    LIMIT 3;
    `
  }

  static async update(
    id: string,
    testimonialData: ITestimonialUpdate,
  ): Promise<ITestimonialUpdate> {
    return prisma.testimonial.update({ where: { id }, data: testimonialData })
  }

  static async delete(id: string): Promise<ITestimonial | null> {
    return prisma.testimonial.delete({ where: { id } })
  }
}
