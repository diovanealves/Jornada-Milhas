import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { TestimonialService } from '../../services/TestimonialService'

describe('testing the testimonial creation route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = process.env.JEST_CREATE_TESTIMONIAL_USERID!
  afterAll(() => {
    closeServer()
  })

  it('must create a testimonial that traverses the services and the repository', async () => {
    const testimonialData = {
      id: '',
      description: 'Test',
      userId,
      createdAt: new Date(),
    }

    const testimonialService = new TestimonialService()

    const createdTestimonial = await testimonialService.create(testimonialData)

    expect(createdTestimonial.description).toBe(testimonialData.description)
    expect(createdTestimonial.userId).toBe(testimonialData.userId)
  })

  it('should return status 201 with the registered testimonial', async () => {
    const testimonialData = {
      description: 'Test Created',
      userId,
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(201)
    expect(response.body.description).toBe(testimonialData.description)
    expect(response.body.userId).toBe(testimonialData.userId)
  })

  it('should return status 400 with empty description field', async () => {
    const testimonialData = {
      description: '',
      userId,
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual([
      'O Campo Descrição e Obrigatório',
      'Descrição precisa ter mais de 5 caracteres',
    ])
  })

  it('should return status 400 saying that the description needs to be at least 5 characters long', async () => {
    const testimonialData = {
      description: 'test',
      userId,
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual([
      'Descrição precisa ter mais de 5 caracteres',
    ])
  })

  it('should return status 400 with empty userId field', async () => {
    const testimonialData = {
      description: 'Test Created',
      userId: '',
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual([
      'Esse depoimento precisa esta relacionada com um usuário',
      'Precisa ser um ID válido',
    ])
  })

  it('should return a 404 status if the user does not exist', async () => {
    const testimonialData = {
      description: 'test created',
      userId: 'cdef731c-0b98-481a-8064-764aa72f00c3',
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(404)
    expect(response.body.err).toEqual('Usuário não encontrado')
  })

  it('should return a 500 status when falling into the catch when trying to create a testimonial', async () => {
    jest
      .spyOn(TestimonialService.prototype, 'create')
      .mockRejectedValue(new Error('Erro ao criar depoimento'))

    const testimonialData = {
      description: 'Test Created',
      userId,
    }

    const response = await request(app)
      .post('/depoimentos')
      .send(testimonialData)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao criar depoimento')
  })
})
