import { OrderStatusEnum } from '@/src/enum'
import { ICertificate } from '@/src/interfaces/certificate'
import { ICity } from '@/src/interfaces/cities'
import { Nullable } from '@/src/interfaces/general'
import { User } from '@/src/interfaces/user'

export interface IOrder {
  orderId: number
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  status: OrderStatusEnum
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  cityId: number
  city: Nullable<ICity>
  certificateId: number
  certificate: Nullable<ICertificate>
  userId: number
  user: Nullable<User>
}

export interface IUpdateOrderStatus {
  orderId: number
  status: OrderStatusEnum
}
