import { BlogContentTypeEnum } from '@/src/enum'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogContentDetails from '@/src/modules/blogs/blog/partials/BlogContentDetails'
import BlogTitleDetails from '@/src/modules/blogs/blog/partials/BlogTitleDetails'
import { useWatch } from 'react-hook-form'
import { IBlogContentEdit } from '@/src/interfaces'

const SingleBlog = () => {
  const blog = useWatch({ name: 'blog' })
  const titleContent = blog?.contents.find((cont: IBlogContentEdit) => cont.type.value === BlogContentTypeEnum.TITLE)

  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [])

  return (
    <GeneralLayout type="GENERAL_FORM" isBottomHidden backButton={{ onClick: handleGoBack }}>
      <BlogTitleDetails title={`${titleContent?.paragraphs[0].text}`} />

      {blog.contents.map((content: IBlogContentEdit, i: number) => (
        <BlogContentDetails content={content} index={i} key={i} blogId={blog.blogId} />
      ))}
    </GeneralLayout>
  )
}

export default SingleBlog
