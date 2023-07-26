import request from 'supertest'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing on testimonial of recent routes', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 with 3 random testimonials', async () => {
    const response = await request(app).get('/depoimentos-home')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('should return a status 500 when falling into the catch when trying to return 3 random testimonial', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'getRandom')
      .mockRejectedValue(new Error('Erro ao obter os depoimentos'))

    const response = await request(app).get('/depoimentos-home')

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao obter os depoimentos')
  })
})
