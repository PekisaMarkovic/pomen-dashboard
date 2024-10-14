import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_COUNTRY_VALIDATION = yupResolver(
  Yup.object({
    name: Yup.string().typeError('name').required('name'),
    iso: Yup.string().typeError('iso').required('iso'),
    code: Yup.string().typeError('code').required('code'),
  }),
)
