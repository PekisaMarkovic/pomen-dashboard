import { ContactStatusEnum } from '@/src/enum/contact'

export interface IContact {
  contactId: number
  name: string
  email: string
  message: string
  status: ContactStatusEnum
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface IUpdateContactStatus {
  contactId: number
  status: ContactStatusEnum
}
