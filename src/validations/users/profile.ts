import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const UPDATE_PROFILE_VALIDATION = yupResolver(
  Yup.object({
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    gender: Yup.string().typeError('gender').required('gender'),
    email: Yup.string().typeError('email').required('email'),
    phoneNumber: Yup.string().typeError('phoneNumber').required('phoneNumber'),
    dateOfBirth: Yup.date().required('dateOfBirth').typeError('dateOfBirth'),
    profileImage: Yup.object().shape({}).required('profileImage'),
  }),
)
