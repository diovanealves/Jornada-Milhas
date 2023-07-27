import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('testing on user delete route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = process.env.JEST_DELETE_USER_ID!
  afterAll(() => {
    closeServer()
  })

  it('should return status 200 with the user being deleted', async () => {
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

    const response = await request(app).delete(`/usuario/${userId}`)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao deletar o usuário.')
  })
})
