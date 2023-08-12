import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing the testimonial update route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const testimonialId = process.env.JEST_GETBYID_UPDATE_TESTIMONIAL_ID!
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 and update the testimonial', async () => {
    const testimonialUpdateData = {
      description: 'Update Test',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(200)
    expect(response.body.description).toBe(testimonialUpdateData.description)
  })

  it('should return status 400 with invalid UUID', async () => {
    const testimonialId = 'cdef731c'
    const response = await request(app).get(`/depoimentos/${testimonialId}`)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(['Precisa ser um ID válido'])
  })

  it('should return status 400 when sending an empty description', async () => {
    const testimonialUpdateData = {
      description: '',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(400)
    expect(response.body.err).toBe('A descrição é obrigatória')
  })

  it('should return status 400 when submitting a description with less than 5 characters', async () => {
    const testimonialUpdateData = {
      description: 'Test',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual([
      'Descrição precisa ter mais de 5 caracteres',
    ])
  })

  it('should return 404 status when trying to update the testimonial with an invalid id', async () => {
    const testimonialId = 'cdef731c-0b98-481a-8064-764aa72f00c3'
    const testimonialUpdateData = {
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

    const testimonialUpdateData = {
      description: 'Update Test',
    }

    const response = await request(app)
      .put(`/depoimentos/${testimonialId}`)
      .send(testimonialUpdateData)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao atualizar o depoimento')
  })
})
