import * as yup from 'yup'

export const idSchema = yup.object({
  id: yup.string().uuid('Precisa ser um ID válido').required(),
})
