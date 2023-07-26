import { prisma } from '../lib/prisma'
import {
  ITestimonial,
  ITestimonialCreate,
  ITestimonialUpdate,
} from '../models/Testimonial'

export class TestimonialRepository {
  async create(
    testimonialData: ITestimonialCreate,
  ): Promise<ITestimonialCreate> {
    return await prisma.testimonial.create({
      data: testimonialData,
    })
  }

  async getAll(): Promise<ITestimonial[]> {
    return await prisma.testimonial.findMany({
      include: { user: true },
    })
  }

  async getById(id: string): Promise<ITestimonial | null> {
    return await prisma.testimonial.findUnique({
      where: { id },
      include: { user: true },
    })
  }

  async getRandom(): Promise<ITestimonial[]> {
    return await prisma.$queryRaw<ITestimonial[]>`
    SELECT
    T.*,
    json_build_object('id', u.id, 'name', u.name, 'image', u.image) as user
    FROM "Testimonial" as T
    JOIN "User" as U ON T."userId" = U."id"
    ORDER BY RANDOM()
    LIMIT 3;
    `
  }

  async update(
    id: string,
    testimonialData: ITestimonialUpdate,
  ): Promise<ITestimonialUpdate> {
    return await prisma.testimonial.update({
      where: { id },
      data: testimonialData,
    })
  }

  async delete(id: string): Promise<ITestimonial | null> {
    return await prisma.testimonial.delete({ where: { id } })
  }
}
