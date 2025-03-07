import { ICemeteryOption, ICertificateOption, ICityOption, ICountryOption, SelectOption } from '@/src/interfaces'
import { BlogContentTypeEnum } from '@/src/enum'

export const mapSingleCountryDropdownToSelectOption = (opt: ICountryOption) => ({ id: `${opt.countryId}`, name: opt.name, value: opt.code })

export const mapCountryDropdownToSelectOptions = (options: ICountryOption[]): SelectOption[] => options.map(mapSingleCountryDropdownToSelectOption)

export const mapSingleCityDropdownToSelectOptions = (opt: ICityOption) => ({ id: `${opt.cityId}`, name: opt.name, value: opt.slug })

export const mapCityDropdownToSelectOptions = (options: ICityOption[]): SelectOption[] => options.map(mapSingleCityDropdownToSelectOptions)

export const mapSingleCityDropdownToSelectOptionsCountry = (opt: ICityOption) => ({ id: `${opt.cityId}`, name: opt.name, value: `${opt.countryId}` })

export const mapCityDropdownToSelectOptionsCountry = (options: ICityOption[]): SelectOption[] =>
  options.map(mapSingleCityDropdownToSelectOptionsCountry)

export const mapSingleCertificateDropdownToSelectOptions = (opt: ICertificateOption) => ({
  id: `${opt.certificateId}`,
  name: opt.name,
  value: opt.slug,
})

export const mapCertificateDropdownToSelectOptions = (options: ICertificateOption[]): SelectOption[] =>
  options.map(mapSingleCertificateDropdownToSelectOptions)

export const mapSingleCemeteryDropdownToSelectOptions = (opt: ICemeteryOption) => ({ id: `${opt.cemeteryId}`, name: opt.name, value: opt.slug })

export const mapCemeteryDropdownToSelectOptions = (options: ICemeteryOption[]): SelectOption[] =>
  options.map(mapSingleCemeteryDropdownToSelectOptions)

export const mapBlogContentTypeToSelectOptions = (excludeTitle: boolean = false): SelectOption[] =>
  Object.entries(BlogContentTypeEnum)
    .filter(([key]) => !(excludeTitle && key === 'TITLE')) // Exclude TITLE if excludeTitle is true
    .map(([key, value]) => ({
      id: key,
      name: key.replace(/_/g, ' '),
      value: value,
    }))
