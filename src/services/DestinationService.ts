import { Destinations } from '@prisma/client'
import { DestinationRepository } from '../repository/DestinationRepository'

export class DestinationService {
  private destinationRepository: DestinationRepository

  constructor() {
    this.destinationRepository = new DestinationRepository()
  }

  async create(destinationData: Destinations): Promise<Destinations> {
    return await this.destinationRepository.create(destinationData)
  }

  async getAll(): Promise<Destinations[]> {
    return await this.destinationRepository.getAll()
  }

  async getById(id: string): Promise<Destinations | null> {
    const destination = await this.destinationRepository.getById(id)

    if (!destination) {
      throw new Error('Destino não encontrado')
    }

    return destination
  }

  async update(
    id: string,
    destinationData: Destinations,
  ): Promise<Destinations> {
    return await this.destinationRepository.update(id, destinationData)
  }

  async delete(id: string): Promise<Destinations> {
    const destination = await this.destinationRepository.getById(id)

    if (!destination) {
      throw new Error('Destino não encontrado')
    }

    return await this.destinationRepository.delete(id)
  }
}
