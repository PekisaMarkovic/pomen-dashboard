import { FileTypeEnum } from '../enum/file'

export interface IFile {
  fileId?: number
  height: number
  publicId: string
  width: number
  fileExtension: string
  url: string
  type: FileTypeEnum
}

export interface IImageCloundinary {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: Date
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  asset_folder: string
  display_name: string
  api_key: string
}

export interface CreateImageDto {
  imageId?: number
  width: number
  url: string
  smallHeight: number
  smallSidth: number
  publicId: string
  smallUrl: string
  bigHeight: number
  height: number
  bigSidth: number
  bigUrl: string
}

export interface ICreateFile {
  height: number
  width: number
  url: string
  fileExtension: string
  publicId: string
  type: FileTypeEnum
}
