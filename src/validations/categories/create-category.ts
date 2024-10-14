import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_CATEGORY_VALIDATION = yupResolver(
  Yup.object({
    name: Yup.string().typeError('name').required('name'),
    description: Yup.string().typeError('description').required('description'),
  }),
)
