import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllBlogs from '@/src/modules/blogs/blog-list/AllBlogs'
import { useEffect } from 'react'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { removeToEditblog } from '@/src/state/shared/blogs'

const BlogsPage = () => {
  const methods = useForm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(removeToEditblog())
  }, [])

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllBlogs />
      </FormProvider>
    </GeneralLayout>
  )
}

export default BlogsPage
