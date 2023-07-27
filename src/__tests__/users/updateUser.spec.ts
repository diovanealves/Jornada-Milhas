import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { IUserUpdate } from '../../models/User'
import { UserService } from '../../services/UserService'

describe('testing the user update route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = process.env.JEST_GETBYID_UPDATE_USER_ID!
  afterAll(() => {
    closeServer()
  })

  it('should give status 200 and update the user', async () => {
    const userUpdateData: IUserUpdate = {
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/87160050?v=4',
    }

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(userUpdateData.name)
    expect(response.body.image).toBe(userUpdateData.image)
  })

  it('should return 404 status when trying to update the data of a user with invalid ID', async () => {
    const userId = 'fe6760e6'
    const userUpdateData: IUserUpdate = {
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/87160050?v=4',
    }

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Usuário não encontrado')
  })

  it('should return a 500 status when falling into the catch when trying to update a users data', async () => {
    jest
      .spyOn(UserService.prototype, 'update')
      .mockRejectedValue(new Error('Erro ao atualizar o usuário'))

    const userUpdateData: IUserUpdate = {
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/87160050?v=4',
    }
    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao atualizar o usuário')
  })
})
