import request from 'supertest'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('Test for creating a user', () => {
  afterAll(() => {
    closeServer()
  })

  it('must create a user going through services and repository', async () => {
    const userData = {
      id: '',
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const userService = new UserService()

    const createdUser = await userService.create(userData)

    expect(createdUser.name).toBe(userData.name)
    expect(createdUser.image).toBe(userData.image)
  })

  it('should create a new user and return status 201', async () => {
    const userData = {
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const response = await request(app).post('/usuario').send(userData)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(userData.name)
    expect(response.body.image).toBe(userData.image)
  })

  it('must return status 400 with all YUP validation errors', async () => {
    const userData = {
      name: '',
      image: '',
    }

    const expectedErrors = [
      'O campo Nome e obrigatório',
      'Nome precisa ter no mínimo 7 caracteres',
    ]
    const response = await request(app).post('/usuario').send(userData)

    expect(response.status).toBe(400)

    expect(response.body.err).toEqual(expectedErrors)
  })

  it('It should return state 400, saying that the name needs to be at least 7 characters long', async () => {
    const userData = {
      name: 'Oi',
      image: '',
    }

    const response = await request(app).post('/usuario').send(userData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual([
      'Nome precisa ter no mínimo 7 caracteres',
    ])
  })

  it('Must return status 400 saying that the image needs to be a URL', async () => {
    const userData = {
      name: 'Diovane Alves',
      image: 'undefined',
    }

    const response = await request(app).post('/usuario').send(userData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(['A foto precisa ser uma URL'])
  })

  it('It should return status 500, having given an error on the server when creating the user', async () => {
    jest
      .spyOn(UserService.prototype, 'create')
      .mockRejectedValue(new Error('Erro ao criar usuario.'))

    const userData = {
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/123456789?v=4',
    }

    const response = await request(app).post('/usuario').send(userData)

    expect(response.status).toBe(500)
    expect(response.body.err).toEqual('Erro ao criar usuario.')
  })
})
