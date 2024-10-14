import { ICertificate } from '../certificate'
import { Nullable } from '../general'

export interface IQRcode {
  qrcodeId: number
  value: string
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  certificateId: number
  certificate: Nullable<ICertificate>
}
