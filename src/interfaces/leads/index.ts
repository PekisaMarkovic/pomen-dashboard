import { LeadStatusEnums } from '@/src/enum'

export interface ILead {
  leadId: number
  firstNameForCertificate: string
  lastNameForCertificate: string
  dateOfBirth: Date
  dateOfDeath: Date
  firstName: string
  lastName: string
  address: string
  email: string
  phoneNumber: string
  note: string
  status: LeadStatusEnums
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  pricingId: number
}

export interface IUpdateLeadStatus {
  leadId: number
  status: LeadStatusEnums
}
