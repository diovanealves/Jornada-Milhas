import request from 'supertest'
import { app, closeServer } from '../../server'
import { ITestimonialCreate } from '../../models/Testimonial'
import { TestimonialRepository } from '../../repository/TestimonialRepository'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing the testimonial creation route', () => {
  afterAll(() => {
    closeServer()
  })

  it('must create a testimonial that traverses the services and the repository', async () => {
    const testimonialData: ITestimonialCreate = {
      description: 'Test',
      userId: '4d31ad12-5fa7-4b90-b846-4d9d1d9c679f',
    }

    const testimonialRepository = new TestimonialRepository()
    const testimonialService = new TestimonialService(testimonialRepository)

    const createdTestimonial = await testimonialService.create(testimonialData)

    expect(createdTestimonial.description).toBe(testimonialData.description)
    expect(createdTestimonial.userId).toBe(testimonialData.userId)
  })

  it('should return status 201 with the registered testimonial', async () => {
    const testimonialData: ITestimonialCreate = {
      description: 'Test',
      userId: '4d31ad12-5fa7-4b90-b846-4d9d1d9c679f',
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(201)
    expect(response.body.description).toBe(testimonialData.description)
    expect(response.body.userId).toBe(testimonialData.userId)
  })

  it('should return status 400 with empty description field', async () => {
    const testimonialData: ITestimonialCreate = {
      description: '',
      userId: '4d31ad12-5fa7-4b90-b846-4d9d1d9c679f',
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(400)
    expect(response.body.err).toBe('O campo Descrição e obrigatório')
  })

  it('should return status 400 with empty userId field', async () => {
    const testimonialData: ITestimonialCreate = {
      description: 'Test',
      userId: '',
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(400)
    expect(response.body.err).toBe('O campo userId e obrigatório')
  })

  it('should return a 500 status when falling into the catch when trying to create a testimonial', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'create')
      .mockRejectedValue(new Error('Erro ao criar depoimento'))

    const testimonialData: ITestimonialCreate = {
      description: 'Test',
      userId: '4d31ad12-5fa7-4b90-b846-4d9d1d9c679f',
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao criar depoimento')
  })
})
