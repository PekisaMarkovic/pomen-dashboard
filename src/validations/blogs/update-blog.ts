import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const UPDATE_BLOG_VALIDATION = yupResolver(
  Yup.object({
    blog: Yup.object({
      contents: Yup.array()
        .of(
          Yup.object({
            type: Yup.object().shape({}).required('type'),
            order: Yup.string()
              .typeError('order')
              .notRequired()
              .test('isNumber', 'order', (value) => {
                if (typeof value === 'string') {
                  return !isNaN(parseInt(value))
                }
                return true
              }),

            paragraphs: Yup.array()
              .of(
                Yup.object().shape({
                  text: Yup.string().typeError('text').required('text').max(820, 'text'),
                  isBold: Yup.object().typeError('isBold').required('isBold'),
                  order: Yup.string()
                    .typeError('order')
                    .notRequired()
                    .test('isNumber', 'order', (value) => {
                      if (typeof value === 'string') {
                        return !isNaN(parseInt(value))
                      }
                      return true
                    }),
                }),
              )
              .required('paragraphs')
              .test('orderParag', 'orderParag', (paragraphs) => {
                if (!paragraphs) return true
                const orders = paragraphs.map((p) => p.order).filter((order) => order !== undefined)
                return new Set(orders).size === orders.length
              }),
          }),
        )
        .required('order')
        .test('orderCont', 'orderCont', (contents) => {
          if (!contents) return true
          const orders = contents.map((c) => c.order).filter((order) => order !== undefined)
          return new Set(orders).size === orders.length
        }),
    }),
  }),
)
