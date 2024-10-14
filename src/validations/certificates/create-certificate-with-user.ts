import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const CREATE_CERTIFICATE_VALIDATION = yupResolver(
  Yup.object({
    addressOrder: Yup.string().typeError('addressOrder').required('addressOrder'),
    biography: Yup.string().typeError('biography').required('biography'),
    emailNewUser: Yup.string().email().typeError('emailNewUser').required('emailNewUser'),
    firstNameNewUser: Yup.string().typeError('firstNameNewUser').required('firstNameNewUser'),
    phoneNewUser: Yup.string().typeError('phoneNewUser').required('phoneNewUser'),
    lastNameNewUser: Yup.string().typeError('lastNameNewUser').required('lastNameNewUser'),
    placeOfBirth: Yup.string().typeError('placeOfBirth').required('placeOfBirth'),
    placeOfDeath: Yup.string().typeError('placeOfDeath').required('placeOfDeath'),
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    city: Yup.object().optional(),
    cemetery: Yup.object().required('cemetery'),
    dateOfBirth: Yup.date().required('dateOfBirth').typeError('dateOfBirth'),
    dateOfDeath: Yup.date().required('dateOfDeath').typeError('dateOfDeath'),
  }),
)
