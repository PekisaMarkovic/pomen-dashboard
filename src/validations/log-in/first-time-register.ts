import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const FIRST_TIME_REGISTER_VALIDATION = yupResolver(
  Yup.object({
    password: Yup.string().typeError('password').required('password').min(8, 'password'),
  }),
)
