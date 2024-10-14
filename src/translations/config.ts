import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enGeneral from './en/general.json'
import enLogIn from './en/log-in.json'
import enErrors from './en/errors.json'
import enStatic from './en/static.json'
import enCountry from './en/country/country.json'
import enCity from './en/cities/cities.json'
import enOrder from './en/orders/orders.json'
import enCemeteries from './en/cemeteries/cemeteries.json'
import enQrcodes from './en/qrcodes/qrcodes.json'
import enTributes from './en/tributes/tributes.json'
import enGetherings from './en/getherings/getherings.json'
import enCertificates from './en/certificates/certificates.json'

export const resources = {
  en: {
    g: enGeneral,
    'log-in': enLogIn,
    static: enStatic,
    order: enOrder,
    qrcode: enQrcodes,
    gethering: enGetherings,
    certificate: enCertificates,
    country: enCountry,
    city: enCity,
    tribute: enTributes,
    cemetery: enCemeteries,
    er: enErrors,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['f', 'b'],
  resources,
})
