import request from 'supertest'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing on testimonial get routes', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 with all testimonial', async () => {
    const response = await request(app).get('/depoimentos')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('should return a status 500 when falling into catch when trying to return all testimonial', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'getAll')
      .mockRejectedValue(new Error('Erro ao obter os depoimentos'))

    const response = await request(app).get('/depoimentos')

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao obter os depoimentos')
  })
})
