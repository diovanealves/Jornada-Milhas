import { Request, Response } from 'express'
import { ValidationError } from 'yup'
import { DestinationService } from '../services/DestinationService'
import { IDestinatioUpdate, IDestinationCreate } from '../models/Destination'
import { idSchema } from '../models/Id'

export default class DestinationController {
  private destinationService: DestinationService

  constructor() {
    this.destinationService = new DestinationService()
  }

  async create(req: Request, res: Response) {
    const destinationData = req.body
    try {
      await IDestinationCreate.validate(destinationData, {
        stripUnknown: true,
        abortEarly: false,
      })

      const newDestination = await this.destinationService.create(
        destinationData,
      )
      return res.status(201).json(newDestination)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      }
      return res.status(500).json({ err: 'Erro ao criar destino' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const destinations = await this.destinationService.getAll()
      return res.json(destinations)
    } catch (err) {
      return res.status(500).json({ err: 'Erro ao obter destino' })
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    try {
      await idSchema.validate({ id })

      const destination = await this.destinationService.getById(id)
      return res.json(destination)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      } else if (
        err instanceof Error &&
        err.message === 'Destino não encontrado'
      ) {
        return res.status(404).json({ err: err.message })
      }
      return res.status(500).json({ err: 'Erro ao obter destino' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const destinationData = req.body
    try {
      await IDestinatioUpdate.validate(destinationData, {
        abortEarly: true,
        stripUnknown: false,
      })

      const destination = await this.destinationService.update(
        id,
        destinationData,
      )

      return res.json(destination)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      }
      return res.status(500).json({ err: 'Erro ao atualizar depoimento' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      await idSchema.validate({ id })

      const destination = await this.destinationService.delete(id)
      return res.json(destination)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ err: err.errors })
      } else if (
        err instanceof Error &&
        err.message === 'Destino não encontrado'
      ) {
        return res.status(404).json({ err: err.message })
      }
      return res.status(500).json({ err: 'Erro ao deletar destino' })
    }
  }
}
