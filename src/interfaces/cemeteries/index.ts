import { ICity, Nullable } from '@/src/interfaces'

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
