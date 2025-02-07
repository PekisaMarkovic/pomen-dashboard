import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllBlogs from '@/src/modules/blogs/blog-list/AllBlogs'

const BlogsPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllBlogs />
      </FormProvider>
    </GeneralLayout>
  )
}

export default BlogsPage
