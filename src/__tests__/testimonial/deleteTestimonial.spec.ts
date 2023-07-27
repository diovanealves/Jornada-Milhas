import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing on testimonial delete route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const testimonialId = process.env.JEST_DELETE_TESTIMONIAL_ID!
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 with a testimonial being deleted', async () => {
    const response = await request(app).delete(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(200)
  })

  it('should return 404 status with trying to delete a testimonial with an invalid ID', async () => {
    const testimonialId = '02d8b436'

    const response = await request(app).delete(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Depoimento não encontrado')
  })

  it('should return a 500 status when falling into the catch when trying to delete a testimonial', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'delete')
      .mockRejectedValue(new Error('Erro ao deletar o depoimento'))

    const response = await request(app).delete(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao deletar o depoimento')
  })
})
