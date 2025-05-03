import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const format = 'DD/MM/YYYY'

const todayString = dayjs()

export const CREATE_CERTIFICATE_VALIDATION = yupResolver(
  Yup.object({
    addressOrder: Yup.string().typeError('addressOrder').required('addressOrder'),
    biography: Yup.string().typeError('biography').required('biography').min(250, 'biographyMin'),
    emailNewUser: Yup.string().email('emailNewUser').typeError('emailNewUser').required('emailNewUser'),
    firstNameNewUser: Yup.string().typeError('firstNameNewUser').required('firstNameNewUser'),
    phoneNewUser: Yup.string().typeError('phoneNewUser').required('phoneNewUser'),
    lastNameNewUser: Yup.string().typeError('lastNameNewUser').required('lastNameNewUser'),
    placeOfBirth: Yup.string().typeError('placeOfBirth').required('placeOfBirth'),
    placeOfDeath: Yup.string().typeError('placeOfDeath').required('placeOfDeath'),
    firstName: Yup.string().typeError('firstName').required('firstName'),
    lastName: Yup.string().typeError('lastName').required('lastName'),
    city: Yup.object().optional(),
    cemetery: Yup.object().required('cemetery'),
    pricingPlan: Yup.object().required('pricingPlan'),
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
