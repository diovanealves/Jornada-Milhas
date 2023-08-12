import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing on routes by searching for user by id', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const testimonialId = process.env.JEST_GETBYID_UPDATE_TESTIMONIAL_ID!
  afterAll(() => {
    closeServer()
  })

  it('should return the status 200 and the testimonial data with that id', async () => {
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('userId')
    expect(response.body).toHaveProperty('user')
  })

  it('should return status 400 with invalid UUID', async () => {
    const testimonialId = 'cdef731c'
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(['Precisa ser um ID válido'])
  })

  it('should return a 404 error when fetching a testimonial with invalid id', async () => {
    const testimonialId = 'cdef731c-0b98-481a-8064-764aa72f00c3'
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Depoimento não encontrado')
  })

  it('should return a status 500 when falling into the catch when trying to return a testimonial with an id', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'getById')
      .mockRejectedValue(new Error('Erro ao obter o depoimento'))

    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao obter o depoimento')
  })
})
