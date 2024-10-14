import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const UPDATE_TRIBUTE_VALIDATION = yupResolver(
  Yup.object({
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    email: Yup.string().email().typeError('email').required('email'),
    description: Yup.string().typeError('description').required('description'),
  }),
)
