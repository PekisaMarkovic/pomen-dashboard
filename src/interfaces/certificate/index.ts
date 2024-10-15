import { ICemetery } from '../cemeteries'
import { LocationPoint, Nullable } from '../general'
import { IGethering } from '../getherings'
import { IFile } from '../image'
import { IOrder } from '../orders'
import { IQRcode } from '../qrcode'
import { ITribute } from '../tributes'
import { User } from '../user'

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
