import { Destinations } from '@prisma/client'
import { prisma } from '../lib/prisma'

export class DestinationRepository {
  async create(destinationData: Destinations): Promise<Destinations> {
    return await prisma.destinations.create({
      data: destinationData,
    })
  }

  async getAll(): Promise<Destinations[]> {
    return await prisma.destinations.findMany({
      include: {
        testimonial: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async getById(id: string): Promise<Destinations | null> {
    return await prisma.destinations.findUnique({
      where: { id },
      include: {
        testimonial: {
          include: {
            user: true,
          },
        },
      },
    })
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
