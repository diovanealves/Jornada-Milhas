import { Router } from 'express'
import TestimonialController from '../controllers/TestimonialController'
import { ValidateTestimonialUpdate } from '../middleware/ValidateTestimonial'

const router = Router()
const testimonialController = new TestimonialController()

router.post(
  '/depoimentos',
  testimonialController.create.bind(testimonialController),
)

router.get(
  '/depoimentos',
  testimonialController.getAll.bind(testimonialController),
)

router.get(
  '/depoimentos/:id',
  testimonialController.getById.bind(testimonialController),
)

router.get(
  '/depoimentos-home',
  testimonialController.getRandom.bind(testimonialController),
)

router.put(
  '/depoimentos/:id',
  ValidateTestimonialUpdate,
  testimonialController.update.bind(testimonialController),
)

router.delete(
  '/depoimentos/:id',
  testimonialController.delete.bind(testimonialController),
)

export default router
