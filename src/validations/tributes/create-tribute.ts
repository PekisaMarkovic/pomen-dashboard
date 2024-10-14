import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_TRIBUTE_VALIDATION = yupResolver(
  Yup.object({
    firtName: Yup.string().typeError('firtName').required('firtName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    email: Yup.string().email().typeError('email').required('email'),
    description: Yup.string().typeError('description').required('description'),
    certificate: Yup.object().required('certificate'),
  }),
)
