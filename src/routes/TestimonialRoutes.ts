import { Router } from 'express'
import TestimonialController from '../controllers/TestimonialController'
import {
  ValidateTestimonialCreate,
  ValidateTestimonialExists,
  ValidateTestimonialUpdate,
} from '../middleware/ValidateTestimonial'

const router = Router()
const testimonialController = new TestimonialController()

router.post(
  '/depoimentos',
  ValidateTestimonialCreate,
  testimonialController.create.bind(testimonialController),
)

router.get(
  '/depoimentos',
  testimonialController.getAll.bind(testimonialController),
)

router.get(
  '/depoimentos/:id',
  ValidateTestimonialExists,
  testimonialController.getById.bind(testimonialController),
)

router.get(
  '/depoimentos-home',
  testimonialController.getRandom.bind(testimonialController),
)

router.put(
  '/depoimentos/:id',
  ValidateTestimonialExists,
  ValidateTestimonialUpdate,
  testimonialController.update.bind(testimonialController),
)

router.delete(
  '/depoimentos/:id',
  ValidateTestimonialExists,
  testimonialController.delete.bind(testimonialController),
)

export default router
