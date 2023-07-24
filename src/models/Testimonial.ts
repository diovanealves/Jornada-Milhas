import { IUser } from './User'

export interface ITestimonial {
  id: string
  description: string
  createdAt: Date
  userId: string
  user: IUser
}

export interface ITestimonialCreate {
  description: string
  userId: string
}

export interface ITestimonialUpdate {
  description: string
}
