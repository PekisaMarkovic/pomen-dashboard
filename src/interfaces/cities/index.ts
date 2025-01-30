import { ICountry } from '@/src/interfaces/country'
import { Nullable } from '@/src/interfaces/general'

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
