import { ICity } from '../cities'
import { Nullable } from '../general'

export interface ICemetery {
  cemeteryId: number
  address: string
  slug: string
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  cityId: number
  city: Nullable<ICity>
}

export interface ICemeteryOption {
  cityId: number
  cemeteryId: number
  name: string
  slug: string
}
