import { Router } from 'express'
import UserController from '../controllers/UserController'
import {
  ValidateUserCreate,
  ValidateUserExists,
  ValidateUserUpdate,
} from '../middleware/ValidateUser'

const router = Router()
const userController = new UserController()

router.post(
  '/usuario',
  ValidateUserCreate,
  userController.create.bind(userController),
)

router.get('/usuario', userController.getAll.bind(userController))

router.get(
  '/usuario/:id',
  ValidateUserExists,
  userController.getById.bind(userController),
)

router.put(
  '/usuario/:id',
  ValidateUserExists,
  ValidateUserUpdate,
  userController.update.bind(userController),
)

router.delete(
  '/usuario/:id',
  ValidateUserExists,
  userController.delete.bind(userController),
)

export default router
