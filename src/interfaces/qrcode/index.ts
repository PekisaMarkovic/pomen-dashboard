import { ICertificate } from '@/src/interfaces/certificate'
import { Nullable } from '@/src/interfaces/general'

export interface IQRcode {
  qrcodeId: number
  value: string
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  certificateId: number
  certificate: Nullable<ICertificate>
}
