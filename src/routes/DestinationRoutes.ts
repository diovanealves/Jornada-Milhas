import { Router } from 'express'
import DestinationController from '../controllers/DestinationController'
import { ValidateDestinationUpdate } from '../middleware/ValidateDestination'

const router = Router()
const destinationController = new DestinationController()

router.post(
  '/destinos',
  destinationController.create.bind(destinationController),
)

router.get(
  '/destinos',
  destinationController.getAll.bind(destinationController),
)

router.get(
  '/destinos/:id',
  destinationController.getById.bind(destinationController),
)

router.put(
  '/destinos/:id',
  ValidateDestinationUpdate,
  destinationController.update.bind(destinationController),
)

router.delete(
  '/destinos/:id',
  destinationController.delete.bind(destinationController),
)

export default router
