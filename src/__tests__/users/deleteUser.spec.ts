import request from 'supertest'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('testing on user delete route', () => {
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 with the user being deleted', async () => {
    const userId = 'fd994809-d0a1-4457-a976-eb8002a5acfc'
    const response = await request(app).delete(`/usuario/${userId}`)

    expect(response.status).toBe(200)
  })

  it('should return 404 status when trying to delete a user with invalid id', async () => {
    const userId = 'fe6760e6'
    const response = await request(app).delete(`/usuario/${userId}`)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Usuário não encontrado')
  })

  it('should return a 500 status when falling into the catch when trying to delete a user', async () => {
    jest
      .spyOn(UserService.prototype, 'delete')
      .mockRejectedValue(new Error('Erro ao deletar o usuário.'))

    const userId = 'fd994809-d0a1-4457-a976-eb8002a5acfc'
    const response = await request(app).delete(`/usuario/${userId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao deletar o usuário.')
  })
})
