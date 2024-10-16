import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const SIGN_UP_VALIDATION = yupResolver(
  Yup.object({
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    phoneNumber: Yup.string().typeError('phoneNumber').required('phoneNumber'),
    email: Yup.string().email('email').typeError('email').required('email'),
    password: Yup.string().typeError('password').required('password').min(8, 'password'),
  }),
)
