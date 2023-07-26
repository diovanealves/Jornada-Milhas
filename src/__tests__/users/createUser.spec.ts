import request from 'supertest'
import { app, closeServer } from '../../server'
import { IUserCreate } from '../../models/User'
import { UserRepository } from '../../repository/UserRepository'
import { UserService } from '../../services/UserService'

describe('Test for creating a user', () => {
  afterAll(() => {
    closeServer()
  })

  it('must create a user going through services and repository', async () => {
    const userData: IUserCreate = {
      name: 'Teste',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    const createdUser = await userService.create(userData)

    expect(createdUser.name).toBe(userData.name)
    expect(createdUser.image).toBe(userData.image)
  })

  it('should create a new user and return status 201', async () => {
    const userData: IUserCreate = {
      name: 'Teste',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const response = await request(app).post('/usuario').send(userData)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(userData.name)
    expect(response.body.image).toBe(userData.image)
  })

  it('should create a new user and return status 400', async () => {
    const userData: IUserCreate = {
      name: '',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const response = await request(app).post('/usuario').send(userData)
    expect(response.status).toBe(400)
  })

  it('should return a 500 status when falling into the catch when trying to create a user', async () => {
    jest
      .spyOn(UserService.prototype, 'create')
      .mockRejectedValue(new Error('Erro ao criar usuario.'))

    const userData: IUserCreate = {
      name: 'Teste',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const response = await request(app).post('/usuario').send(userData)
    expect(response.status).toBe(500)
    expect(response.body.err).toBe('Erro ao criar usuario.')
  })
})
