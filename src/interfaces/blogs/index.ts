import { BlogContentTypeEnum } from '@/src/enum'
import { Nullable, SelectOption } from '../general'

export interface IBlog {
  blogId: number
  slug: string
  createdAt: Date
  updatedAt: Nullable<Date>
  publishedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  contents: IBlogContent[]
}

export interface IBlogContent {
  blogContentId?: number
  createdAt: Date
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  order: number
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
  updatedAt: Nullable<Date>
  order: number
  isBold: boolean
  deletedAt: Nullable<Date>
  blogContentId: number
  blogContent: NonNullable<IBlogContent>
}

export interface IBlogTextEdit {
  blogTextId?: number
  text: string
  createdAt: Date
  updatedAt: Nullable<Date>
  isBold: SelectOption
  order: number
  deletedAt: Nullable<Date>
  blogContentId: number
  blogContent: NonNullable<IBlogContent>
}

export interface IBlogContentEdit {
  blogContentId: number
  createdAt: Date
  order: number
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  paragraphs: IBlogTextEdit[]
  blogId: number
  blog: IBlog
  type: SelectOption
  blogContentImageId: number
  blogContentImage: File
}
