import request from 'supertest'
import 'dotenv/config'
import { app, closeServer } from '../../server'
import { UserService } from '../../services/UserService'

describe('testing the user update route', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = process.env.JEST_GETBYID_UPDATE_USER_ID!
  afterAll(() => {
    closeServer()
  })

  it('should give status 200 and update the user', async () => {
    const userUpdateData = {
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

  it('should return status 400 with error in minimum characters in name and image is not a url', async () => {
    const userUpdateData = {
      name: 'OI',
      image: 'undefined',
    }

    const expectedErrors = [
      'Nome precisa ter no mínimo 7 caracteres',
      'A foto precisa ser uma URL',
    ]

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(expectedErrors)
  })

  it('should return status 400 with error that the name needs to be at least 7 characters long', async () => {
    const userUpdateData = {
      name: 'OI',
    }

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual([
      'Nome precisa ter no mínimo 7 caracteres',
    ])
  })

  it('should return status 400 with the error that the image is not a url', async () => {
    const userUpdateData = {
      name: '',
      image: 'undefined',
    }

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(['A foto precisa ser uma URL'])
  })

  it('should return status 400 saying that it is necessary to send the name or the image to update', async () => {
    const userUpdateData = {
      name: '',
      image: '',
    }

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(
      'E necessários enviar pelo menos um campo para atualizar o usuário',
    )
  })

  it('Should return status 400, with UUID validation error', async () => {
    const userId = 'cdef731c-0b98-481a-8064-764aa72f00c'
    const response = await request(app).get(`/usuario/${userId}`)

    expect(response.status).toBe(400)
    expect(response.body.err).toEqual(['Precisa ser um ID válido'])
  })

  it('should return 404 status when trying to update the data of a user with invalid ID', async () => {
    const userId = 'cdef731c-0b98-481a-8064-764aa72f00c9'
    const userUpdateData = {
      name: 'Diovane Alves',
      image: 'https://avatars.githubusercontent.com/u/87160050?v=4',
    }

    const response = await request(app)
      .put(`/usuario/${userId}`)
      .send(userUpdateData)

    expect(response.status).toBe(404)
    expect(response.body.err).toBe('Usuário não encontrado')
  })

  it('should return status 500 when not sending in the request the name and image', async () => {
    const response = await request(app).put(`/usuario/${userId}`).send()

    expect(response.status).toBe(500)
    expect(response.body.err).toEqual('Erro ao validar os campos do usuario')
  })

  it('should return a 500 status when falling into the catch when trying to update a users data', async () => {
    jest
      .spyOn(UserService.prototype, 'update')
      .mockRejectedValue(new Error('Erro ao atualizar o usuário'))

    const userUpdateData = {
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
