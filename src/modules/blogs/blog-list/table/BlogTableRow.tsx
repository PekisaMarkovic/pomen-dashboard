import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { formatDateYearMonthDay } from '@/src/utils/date'
import { IBlog } from '@/src/interfaces/blogs'
import { BlogContentTypeEnum } from '@/src/enum'
import { useApi } from '@/src/hooks/use-api'
import { useCallback } from 'react'
import BlogApis from '@/src/api/blog'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import customToast from '@/src/components/core/toast/CustomToast'
import { selectBlogs, setBlogs } from '@/src/state/shared/blogs'

type Props = {
  blog: IBlog
}

const BlogTableRow = ({ blog }: Props) => {
  const api = useApi()
  const dispatch = useAppDispatch()
  const { blogs } = useAppSelector(selectBlogs)
  const { t } = useTranslation(['g:button'])
  const { blogId, slug, createdAt, updatedAt } = blog
  const linkTo = `${ROUTE_NAMES.blogs}/${blogId}`
  const contentTitle = blog.contents.find((cont) => cont.type === BlogContentTypeEnum.TITLE)

  const deleteBlog = useCallback(async () => {
    try {
      await api.delete(BlogApis.deleteBlog(blogId))

      if (blogs) {
        dispatch(setBlogs({ ...blogs, items: blogs.items.filter((bl) => bl.blogId !== blogId) }))
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [blogId, blogs])

  const publishOrUnpublishBlog = useCallback(async () => {
    try {
      const { data: updatedBlog } = await api.post<IBlog>(BlogApis.publishOrUnpublishBlog(), { blogId })

      if (blogs) {
        dispatch(
          setBlogs({
            ...blogs,
            items: blogs.items.map((bl) => {
              if (bl.blogId == blogId) {
                return { ...bl, ...updatedBlog }
              }
              return bl
            }),
          }),
        )
      }

      customToast.success(t('g:blogSuccess'))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [blogId, blogs])

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t(blog.publishedAt ? 'g:button.unpublish' : 'g:button.publish'),
          onClick: publishOrUnpublishBlog,
        },
        textColor: blog.publishedAt ? 'grey' : 'green',
      },

      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: deleteBlog,
        },
        textColor: 'red',
      },
    ]
    return options
  }

  return (
    <DefaultTableRowContainer cols={5} dropdownOptions={checkOptions()}>
      <Link to={linkTo} className="col-span-2 py-3 flex">
        <Paragraph text={`${contentTitle?.paragraphs[0].text || slug}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={slug} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={formatDateYearMonthDay(createdAt)} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={updatedAt ? formatDateYearMonthDay(updatedAt) : '-'} size="sm" color="black" noWrap />
      </Link>
    </DefaultTableRowContainer>
  )
}

export default BlogTableRow
