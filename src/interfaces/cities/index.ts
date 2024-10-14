import { ICountry } from '../country'
import { Nullable } from '../general'

export interface ICity {
  cityId: number
  name: string
  slug: string
  code: string
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  countryId: number
  country: Nullable<ICountry>
}

export interface ICityOption {
  cityId: number
  countryId: number
  name: string
  slug: string
}
