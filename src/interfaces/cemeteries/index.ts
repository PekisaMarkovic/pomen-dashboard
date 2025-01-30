import { ICity } from '@/src/interfaces/cities'
import { Nullable } from '@/src/interfaces/general'

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
