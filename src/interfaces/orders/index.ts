import { OrderStatusEnum } from '../../enum/order'
import { ICertificate } from '../certificate'
import { ICity } from '../cities'
import { Nullable } from '../general'
import { User } from '../user'

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
