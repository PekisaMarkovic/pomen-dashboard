import { ICertificate } from '@/src/interfaces/certificate'
import { Nullable } from '@/src/interfaces/general'

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
