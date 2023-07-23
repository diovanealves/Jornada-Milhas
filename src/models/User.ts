export interface IUser {
  id: string
  name: string
  image: string
}

export interface IUserCreate {
  name: string
  image: string
}

export interface IUserUpdate {
  name?: string
  image?: string
}
