import request from 'supertest'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing on routes by searching for user by id', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return the status 200 and the testimonial data with that id', async () => {
    const testimonialId = '13e770cf-f14a-4b73-8a74-49bc6e026126'
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('userId')
    expect(response.body).toHaveProperty('user')
  })

  it('should return a 404 error when fetching a testimonial with invalid id', async () => {
    const testimonialId = 'f548aeeb'
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Depoimento não encontrado')
  })

  it('should return a status 500 when falling into the catch when trying to return a testimonial with an id', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'getById')
      .mockRejectedValue(new Error('Erro ao obter o depoimento'))

    const testimonialId = '13e770cf-f14a-4b73-8a74-49bc6e026126'
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao obter o depoimento')
  })
})
