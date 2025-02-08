import BlogApis from '@/src/api/blog'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { SelectOption } from '@/src/interfaces/general'
import { mapBlogContentTypeToSelectOptions } from '@/src/mapper/options'
import SingleBlog from '@/src/modules/blogs/blog/SingleBlog'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectBlogs, setToEditBlog } from '@/src/state/shared/blogs'
import { UPDATE_BLOG_VALIDATION } from '@/src/validations/blogs/update-blog'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const SingleBlogPage = () => {
  const { toEditBlog } = useAppSelector(selectBlogs)

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const api = useApi()
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    try {
      const { data } = await api.get(BlogApis.getBlogById(Number(id)))

      dispatch(setToEditBlog(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return <>{toEditBlog ? <SingleBlogForm /> : null}</>
}

const SingleBlogForm = () => {
  const { toEditBlog } = useAppSelector(selectBlogs)
  const options = mapBlogContentTypeToSelectOptions()
  const blog = {
    ...toEditBlog,
    contents: [...(toEditBlog?.contents || [])]
      .sort((a, b) => Number(a.order) - Number(b.order))
      .map((cont) => {
        const type = options.find((o) => o.value === cont.type)
        return {
          ...cont,
          order: `${cont.order}`,
          paragraphs: cont.paragraphs.map((par) => {
            const isBold: SelectOption = { id: '0', name: '', value: '', checked: par.isBold }
            return { ...par, isBold, order: `${par.order}` }
          }),
          type,
          blogContentImage: cont.blogContentImageId !== null && cont.blogContentImageId !== undefined ? cont.blogContentImage : {},
        }
      }),
  }

  const methods = useForm({
    resolver: UPDATE_BLOG_VALIDATION,
    defaultValues: { blog },
  })

  return (
    <FormProvider {...methods}>
      <SingleBlog />
    </FormProvider>
  )
}

export default SingleBlogPage
