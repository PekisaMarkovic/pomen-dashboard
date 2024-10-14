import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const UPDATE_GETHERING_VALIDATION = yupResolver(
  Yup.object({
    getheringDate: Yup.date().typeError('getheringDate').required('getheringDate'),
    address: Yup.string().typeError('address').required('address'),
    hour: Yup.object().required('hour'),
  }),
)
