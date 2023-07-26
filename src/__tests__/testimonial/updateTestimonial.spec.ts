import request from 'supertest'
import { app, closeServer } from '../../server'
import { ITestimonialUpdate } from '../../models/Testimonial'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing the testimonial update route', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 and update the testimonial', async () => {
    const testimonialId = '13e770cf-f14a-4b73-8a74-49bc6e026126'
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

    const testimonialId = '13e770cf-f14a-4b73-8a74-49bc6e026126'
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
