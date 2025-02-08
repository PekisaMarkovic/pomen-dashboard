import BlogTop from '@/src/modules/blogs/blog-list/partials/BlogTop'
import BlogTable from '@/src/modules/blogs/blog-list/table/BlogTable'
import { useApi } from '@/src/hooks/use-api'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import BlogApis from '@/src/api/blog'
import { setBlogs } from '@/src/state/shared/blogs'
import customToast from '@/src/components/core/toast/CustomToast'
import { useWatch } from 'react-hook-form'

const limit = 10

const AllBlogs = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const searchTerm = useWatch({ name: 'searchTerm' })

  const fetchData = useCallback(async (page: string, searchTerm: string) => {
    const title = searchTerm || ''
    try {
      const { data } = await api.post(BlogApis.blogSearch(), { page: Number(page), limit, title })

      dispatch(setBlogs(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData(page, searchTerm)
  }, [page, searchTerm])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <BlogTop />
      <BlogTable />
    </form>
  )
}

export default AllBlogs
