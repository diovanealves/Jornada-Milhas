import { Router } from 'express'
import UserController from '../controllers/UserController'
import { ValidateUserUpdate } from '../middleware/ValidateUser'

const router = Router()
const userController = new UserController()

router.post('/usuario', userController.create.bind(userController))

router.get('/usuario', userController.getAll.bind(userController))

router.get('/usuario/:id', userController.getById.bind(userController))

router.put(
  '/usuario/:id',
  ValidateUserUpdate,
  userController.update.bind(userController),
)

router.delete('/usuario/:id', userController.delete.bind(userController))

export default router
