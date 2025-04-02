import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const EDIT_CERTIFICATE_VALIDATION = yupResolver(
  Yup.object({
    biography: Yup.string().typeError('biography').required('biography').min(250, 'biographyMin'),
    placeOfBirth: Yup.string().typeError('placeOfBirth').required('placeOfBirth'),
    placeOfDeath: Yup.string().typeError('placeOfDeath').required('placeOfDeath'),
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    city: Yup.object().required('city'),
    cemetery: Yup.object().required('cemetery').typeError('cemetery'),
    profileImage: Yup.object().required('profileImage').typeError('profileImage'),
    dateOfBirth: Yup.date().required('dateOfBirth').typeError('dateOfBirth'),
    dateOfDeath: Yup.date().required('dateOfDeath').typeError('dateOfDeath'),
    videos: Yup.array().of(Yup.object()).typeError('videos'),
    images: Yup.array().of(Yup.object()).min(1, 'images').typeError('images'),
  }),
)
