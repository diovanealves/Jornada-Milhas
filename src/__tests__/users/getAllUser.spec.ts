import request from 'supertest'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('testing on user get routes', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 with all users', async () => {
    const response = await request(app).get('/usuario')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('should return a 500 status when falling into the catch when trying to return all users', async () => {
    jest
      .spyOn(UserService.prototype, 'getAll')
      .mockRejectedValue(new Error('Erro ao obter o usuário'))

    const response = await request(app).get('/usuario')

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao obter o usuário')
  })
})
