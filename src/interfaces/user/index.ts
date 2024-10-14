import { PermissionEnums, RoleEnums } from '../../enum/user'
import { Nullable } from '../general'
import { IFile } from '../image'

export interface IPermisions {
  id: number
  name: PermissionEnums
}

export interface IRole {
  id: number
  name: RoleEnums
  permissions: PermissionEnums[]
}

export type TokenData = {
  access_token: string
  refresh_token: string
}

export type TokenPayload = {
  email: string
  firstName: string
  lastName: string
  roles: IRole[]
  profileImage: Nullable<string>
  exp: number
  iat: number
  expires: number
}

export interface User {
  userId: number
  firstName: string
  lastName: string
  profileImageId: Nullable<number>
  profileImage: Nullable<IFile>
  gender: Nullable<string>
  dateOfBirth: Nullable<Date>
  createdAt: Nullable<Date>
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  lastLoggedInAt: Nullable<Date>
  email: string
  phoneNumber: Nullable<string>
  isEmailConfirmed: boolean
}
