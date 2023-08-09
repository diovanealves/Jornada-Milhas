import { Destinations } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class DestinationRepository {
  async create(destinationData: Destinations): Promise<Destinations> {
    const { testimonials, ...destination } = destinationData

    return await prisma.destinations.create({
      data: {
        ...destination,
        testimonials: {
          connect: testimonials?.map((testimonialId: string) => ({
            id: testimonialId,
          })),
        },
      },
    })
  }

  async getAll(): Promise<Destinations[]> {
    return await prisma.destinations.findMany()
  }

  async getById(id: string): Promise<Destinations | null> {
    const destination = await prisma.destinations.findUnique({
      where: { id },
    })

    if (!destination) {
      return null
    }

    const testimonials = await prisma.testimonial.findMany({
      where: {
        destinations: { some: { id } },
      },
    })

    const destinationWithTestimonials = {
      ...destination,
      testimonials,
    }

    console.log(testimonials)

    return destinationWithTestimonials
  }

  async update(
    id: string,
    destinationData: Destinations,
  ): Promise<Destinations> {
    return await prisma.destinations.update({
      where: { id },
      data: destinationData,
    })
  }

  async delete(id: string): Promise<Destinations> {
    return await prisma.destinations.delete({ where: { id } })
  }
}
