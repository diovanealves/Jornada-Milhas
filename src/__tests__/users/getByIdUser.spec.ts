import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('testing on routes by searching for user by id', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = process.env.JEST_GETBYID_UPDATE_USER_ID!
  afterAll(() => {
    closeServer()
  })

  it('should return the status 200 and the user data with that id', async () => {
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('image')
  })

  it('Should return status 400, with UUID validation error', async () => {
    const userId = 'cdef731c-0b98-481a-8064-764aa72f00c'
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(['Precisa ser um ID válido'])
  })

  it('should return a 404 error when fetching a user with invalid id', async () => {
    const userId = 'cdef731c-0b98-481a-8064-764aa72f00c3'
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(404)
    expect(response.body.err).toEqual('Usuário não encontrado')
  })

  it('should return a status 500 when falling into the catch when trying to return a tesminoial with an id', async () => {
    jest
      .spyOn(UserService.prototype, 'getById')
      .mockRejectedValue(new Error('Erro ao obter o usuário específico'))

    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toEqual('Erro ao obter o usuário específico')
  })
})
