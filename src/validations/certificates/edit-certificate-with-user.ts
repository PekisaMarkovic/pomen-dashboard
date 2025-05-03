import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const format = 'DD/MM/YYYY'

const todayString = dayjs()

export const EDIT_CERTIFICATE_VALIDATION = yupResolver(
  Yup.object({
    biography: Yup.string().typeError('biography').required('biography').min(250, 'biographyMin').max(5000, 'biographyMax'),
    placeOfBirth: Yup.string().typeError('placeOfBirth').required('placeOfBirth'),
    placeOfDeath: Yup.string().typeError('placeOfDeath').required('placeOfDeath'),
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    city: Yup.object().required('city'),
    cemetery: Yup.object().required('cemetery').typeError('cemetery'),
    profileImage: Yup.object().required('profileImage').typeError('profileImage'),
    videos: Yup.array().of(Yup.object()).typeError('videos'),
    images: Yup.array().of(Yup.object()).min(1, 'images').typeError('images'),
    dateOfBirth: Yup.string()
      .required('dateOfBirth')
      .typeError('dateOfBirth')
      .when([], (__, schema) => {
        return schema.test('not-in-future', 'dateOfBirthCannotBeInFuture', function (value) {
          const selectedDate = dayjs(value, format)
          const today = dayjs(todayString, format)

          if (value) {
            return selectedDate.isBefore(today)
          }
          return true
        })
      }),
    dateOfDeath: Yup.string()
      .required('dateOfDeath')
      .typeError('dateOfDeath')
      .when([], (__, schema) => {
        return schema.test(
          'not-in-future',
          'dateOfDeathCannotBeInFuture',

          function (value) {
            const selectedDate = dayjs(value, format)
            const today = dayjs(todayString, format)

            if (value) {
              return selectedDate.isBefore(today)
            }
            console.log('ovde')
            return true
          },
        )
      })
      .when('dateOfBirth', (dateOfBirth, schema) => {
        return schema.test('is-after-birth', 'dateOfDeathMustBeAfterDateOfBirth', function (dateOfDeath) {
          if (dateOfBirth.length && dateOfDeath) {
            const date1 = dayjs(dateOfBirth[0], format)
            const date2 = dayjs(dateOfDeath, format)

            if (date2.isSame(date1)) return true

            return date2.isAfter(date1)
          }
          return true
        })
      }),
  }),
)
