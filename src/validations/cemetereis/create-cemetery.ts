import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_CEMETERY_VALIDATION = yupResolver(
  Yup.object({
    name: Yup.string().typeError('name').required('name'),
    address: Yup.string().typeError('address').required('address'),
    city: Yup.object().required('city'),
  }),
)
