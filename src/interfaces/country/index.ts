import { Nullable } from '../general'

export interface ICountry {
  countryId: number
  name: string
  slug: string
  code: string
  iso: string
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
}

export interface ICountryOption {
  countryId: number
  name: string
  code: string
}
