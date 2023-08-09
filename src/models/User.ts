import * as yup from 'yup'

export const IUserCreate = yup.object({
  name: yup
    .string()
    .required('O campo Nome e obrigatório')
    .min(7, 'Nome precisa ter no mínimo 7 caracteres'),
  image: yup.string().notRequired().url('A foto precisa ser uma URL'),
})

export const IUserUpdate = yup.object({
  name: yup
    .string()
    .notRequired()
    .min(7, 'Nome precisa ter no mínimo 7 caracteres'),
  image: yup.string().notRequired().url('A foto precisa ser uma URL'),
})
