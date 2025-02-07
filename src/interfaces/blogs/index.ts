import { BlogContentTypeEnum } from '@/src/enum'
import { SelectOption } from '../general'

export interface IBlog {
  blogId: number
  slug: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  contents: IBlogContent[]
}

export interface IBlogContent {
  blogContentId?: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  paragraphs: IBlogText[]
  blogId: number
  blog: IBlog
  type: BlogContentTypeEnum
  blogContentImageId: number
  blogContentImage: File
}

export interface IBlogText {
  blogTextId?: number
  text: string
  createdAt: Date
  updatedAt: Date
  isBold: boolean
  deletedAt: Date
  blogContentId: number
  blogContent: NonNullable<IBlogContent>
}

export interface IBlogTextEdit {
  blogTextId?: number
  text: string
  createdAt: Date
  updatedAt: Date
  isBold: SelectOption
  deletedAt: Date
  blogContentId: number
  blogContent: NonNullable<IBlogContent>
}

export interface IBlogContentEdit {
  blogContentId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  paragraphs: IBlogTextEdit[]
  blogId: number
  blog: IBlog
  type: SelectOption
  blogContentImageId: number
  blogContentImage: File
}
