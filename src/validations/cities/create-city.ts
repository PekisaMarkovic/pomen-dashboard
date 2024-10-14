import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_CITY_VALIDATION = yupResolver(
  Yup.object({
    name: Yup.string().typeError('name').required('name'),
    code: Yup.string().typeError('code').required('code'),
    country: Yup.object().required('country'),
  }),
)
