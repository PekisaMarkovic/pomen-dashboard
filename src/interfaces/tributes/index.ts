import { TributeStatusEnum } from '../../enum/tribute'
import { ICertificate } from '../certificate'
import { Nullable } from '../general'

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
