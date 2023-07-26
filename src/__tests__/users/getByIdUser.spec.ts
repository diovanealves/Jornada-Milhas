import request from 'supertest'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('testing on routes by searching for user by id', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return the status 200 and the user data with that id', async () => {
    const userId = '4d31ad12-5fa7-4b90-b846-4d9d1d9c679f'
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('image')
  })

  it('should return a 404 error when fetching a user with invalid id', async () => {
    const userId = 'fe6760e6'
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Usuário não encontrado')
  })

  it('should return a status 500 when falling into the catch when trying to return a tesminoial with an id', async () => {
    jest
      .spyOn(UserService.prototype, 'getById')
      .mockRejectedValue(new Error('Erro ao obter o usuário'))

    const userId = '4d31ad12-5fa7-4b90-b846-4d9d1d9c679f'
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao obter o usuário')
  })
})
