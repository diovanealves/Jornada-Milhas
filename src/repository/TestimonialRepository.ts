import { Testimonial } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class TestimonialRepository {
  async create(testimonialData: Testimonial): Promise<Testimonial> {
    return await prisma.testimonial.create({
      data: testimonialData,
    })
  }

  async getAll(): Promise<Testimonial[]> {
    return await prisma.testimonial.findMany({
      include: { user: true },
    })
  }

  async getById(id: string): Promise<Testimonial | null> {
    return await prisma.testimonial.findUnique({
      where: { id },
      include: { user: true },
    })
  }

  async getRandom(): Promise<Testimonial[]> {
    return await prisma.$queryRaw<Testimonial[]>`
    SELECT
    T.*,
    json_build_object('id', u.id, 'name', u.name, 'image', u.image) as user
    FROM "Testimonial" as T
    JOIN "User" as U ON T."userId" = U."id"
    ORDER BY RANDOM()
    LIMIT 3;
    `
  }

  async update(id: string, testimonialData: Testimonial): Promise<Testimonial> {
    return await prisma.testimonial.update({
      where: { id },
      data: testimonialData,
    })
  }

  async delete(id: string): Promise<Testimonial | null> {
    return await prisma.testimonial.delete({ where: { id } })
  }
}
