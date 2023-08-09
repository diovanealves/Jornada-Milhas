import * as yup from 'yup'

export const ITestimonialCreate = yup.object({
  description: yup
    .string()
    .required('O Campo Descrição e Obrigatório')
    .min(5, 'Descrição precisa ter mais de 5 caracteres'),
  userId: yup
    .string()
    .required('Esse depoimento precisa esta relacionada com um usuário')
    .uuid('Precisa ser um ID válido'),
})

export const ITestimonialUpdate = yup.object({
  description: yup
    .string()
    .min(5, 'Descrição precisa ter mais de 5 caracteres')
    .required('O Campo Descrição e Obrigatório'),
})
