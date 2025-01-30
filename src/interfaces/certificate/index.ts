import { ICemetery } from '@/src/interfaces/cemeteries'
import { LocationPoint, Nullable } from '@/src/interfaces/general'
import { IGethering } from '@/src/interfaces/getherings'
import { IFile } from '@/src/interfaces/image'
import { IOrder } from '@/src/interfaces/orders'
import { IQRcode } from '@/src/interfaces/qrcode'
import { ITribute } from '@/src/interfaces/tributes'
import { User } from '@/src/interfaces/user'

export interface ICertificate {
  certificateId: number
  slug: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  dateOfDeath: Date
  placeOfBirth: string
  placeOfDeath: string
  timeOfDeath: Nullable<number>
  biography: string
  location: LocationPoint
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  cemeteryId: number
  cemetery: Nullable<ICemetery>
  userId: number
  user: User
  getherings: IGethering[]
  tributes: ITribute[]
  qrcode: IQRcode
  orders: IOrder[]
  certificateProfileId: number
  profileImage: Nullable<IFile>
  files: IFile[]
}

export interface ICertificateFile {
  profile: IFile
  images: IFile[]
  videos: IFile[]
  document: IFile[]
}

export interface ICertificateOption {
  certificateId: number
  name: string
  slug: string
  image: string
}
