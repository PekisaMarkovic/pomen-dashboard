import { PricingPackagesEnums } from '@/src/enum'

export interface IPricing {
  pricingId: number
  plan: PricingPackagesEnums
  price: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface IPricingOption {
  pricingId: number
  plan: PricingPackagesEnums
  price: number
}
