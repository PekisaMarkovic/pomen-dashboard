import { CertificateStatusEnums } from '@/src/enum'
import { ICemetery, LocationPoint, Nullable, IGethering, User, ITribute, IFile, IOrder, IQRcode, IPricing } from '@/src/interfaces'

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
  status: CertificateStatusEnums
  pricing: Nullable<IPricing>
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
