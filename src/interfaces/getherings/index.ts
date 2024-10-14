import { ICertificate } from '../certificate'
import { Nullable } from '../general'

export interface IGethering {
  getheringId: number
  getheringDate: Date
  hour: number
  address: string
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Date
  certificateId: number
  certificate: Nullable<ICertificate>
}
