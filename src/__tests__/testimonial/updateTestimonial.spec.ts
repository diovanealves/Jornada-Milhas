import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { ITestimonialUpdate } from '../../models/Testimonial'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing the testimonial update route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const testimonialId = process.env.JEST_GETBYID_UPDATE_TESTIMONIAL_ID!
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 and update the testimonial', async () => {
    const testimonialUpdateData: ITestimonialUpdate = {
      description: 'Update Test',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(200)
    expect(response.body.description).toBe(testimonialUpdateData.description)
  })

  it('should return 404 status when trying to update the testimonial with an invalid id', async () => {
    const testimonialId = '13e770cf'
    const testimonialUpdateData: ITestimonialUpdate = {
      description: 'Update Test',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Depoimento não encontrado')
  })

  it('should return a 500 status when falling into the catch when trying to update the data of a testimonial', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'update')
      .mockRejectedValue(new Error('Erro ao atualizar o depoimento'))

    const testimonialUpdateData: ITestimonialUpdate = {
      description: 'Update Test',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao atualizar o depoimento')
  })
})
