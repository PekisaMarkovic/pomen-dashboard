import { ICemeteryOption } from '@/src/interfaces/cemeteries'
import { ICertificateOption } from '@/src/interfaces/certificate'
import { ICityOption } from '@/src/interfaces/cities'
import { ICountryOption } from '@/src/interfaces/country'
import { SelectOption } from '@/src/interfaces/general'

export const mapCountryDropdownToSelectOptions = (options: ICountryOption[]): SelectOption[] =>
  options.map((opt) => {
    return { id: `${opt.countryId}`, name: opt.name, value: opt.code }
  })

export const mapCityDropdownToSelectOptions = (options: ICityOption[]): SelectOption[] =>
  options.map((opt) => {
    return { id: `${opt.cityId}`, name: opt.name, value: opt.slug }
  })

export const mapCityDropdownToSelectOptionsCountry = (options: ICityOption[]): SelectOption[] =>
  options.map((opt) => {
    return { id: `${opt.cityId}`, name: opt.name, value: `${opt.countryId}` }
  })

export const mapCertificateDropdownToSelectOptions = (options: ICertificateOption[]): SelectOption[] =>
  options.map((opt) => {
    return { id: `${opt.certificateId}`, name: opt.name, value: opt.slug }
  })

export const mapCemeteryDropdownToSelectOptions = (options: ICemeteryOption[]): SelectOption[] =>
  options.map((opt) => {
    return { id: `${opt.cemeteryId}`, name: opt.name, value: opt.slug }
  })
