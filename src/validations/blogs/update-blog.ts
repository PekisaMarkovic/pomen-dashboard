import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const UPDATE_BLOG_VALIDATION = yupResolver(
  Yup.object({
    blog: Yup.object({
      contents: Yup.array()
        .of(
          Yup.object({
            type: Yup.object().shape({}).required('type'),

            paragraphs: Yup.array()
              .of(
                Yup.object().shape({
                  text: Yup.string().typeError('text').required('text').max(250, 'text'),
                  isBold: Yup.object().typeError('isBold').required('isBold'),
                }),
              )
              .required('paragraphs'),
          }),
        )
        .required('contents'),
    }),
  }),
)
