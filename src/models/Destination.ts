import * as yup from 'yup'

export const IDestinationCreate = yup.object({
  name: yup.string().required('O campo name é obrigatório'),
  price: yup
    .number()
    .required('O campo preço é obrigatório')
    .positive('O campo preço deve ser um número positivo'),
  imagesUrl: yup
    .array()
    .of(yup.string().url('Cada item em imagem deve ser uma URL válida'))
    .required('O campo imagesUrl é obrigatório'),
})

export const IDestinatioUpdate = yup.object({
  name: yup.string().trim().notRequired(),
  price: yup
    .number()
    .positive('O campo preço deve ser um número positivo')
    .notRequired(),
  imagesUrl: yup
    .array()
    .of(yup.string().trim())
    .test('no-empty-urls, "Nenhuma imagem pode estar vazia', (imagesUrl) => {
      if (!imagesUrl) return false
      return imagesUrl.every((url) => url?.trim() !== '')
    })
    .optional(),
})
