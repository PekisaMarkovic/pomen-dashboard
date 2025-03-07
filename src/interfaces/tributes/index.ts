import { TributeStatusEnum } from '@/src/enum'
import { ICertificate } from '@/src/interfaces/certificate'
import { Nullable } from '@/src/interfaces/general'

export interface ITribute {
  tributeId: number
  firstName: string
  lastName: string
  description: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  status: TributeStatusEnum
  certificateId: number
  certificate: Nullable<ICertificate>
}
