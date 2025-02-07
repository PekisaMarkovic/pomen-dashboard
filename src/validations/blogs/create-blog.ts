import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_BLOG_VALIDATION = yupResolver(
  Yup.object({
    title: Yup.string().typeError('title').required('title'),
  }),
)
