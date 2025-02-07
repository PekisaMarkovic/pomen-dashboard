import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { removeModal } from '@/src/state/shared/modal'
import { CREATE_BLOG_VALIDATION } from '@/src/validations/blogs/create-blog'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'
import BlogApis from '@/src/api/blog'
import { BlogContentTypeEnum } from '@/src/enum'
import { useNavigate } from 'react-router-dom'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'

const AddBlogModal = () => {
  const methods = useForm({ resolver: CREATE_BLOG_VALIDATION })

  return (
    <FormProvider {...methods}>
      <AddBlogModalForm />
    </FormProvider>
  )
}

const AddBlogModalForm = () => {
  const { t } = useTranslation(['blogs', 'g'])
  const { handleSubmit } = useFormContext()
  const api = useApi()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { data } = await api.post(BlogApis.createBlog(), {
        contents: [
          {
            paragraphs: [values.title],
            type: BlogContentTypeEnum.TITLE,
          },
        ],
      })

      dispatch(removeModal())
      navigate(`${ROUTE_NAMES.blogs}/${data.blogId}`)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('blogs:add.title')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        <InputText isRequired name="title" label={t('blogs:add.fields.title')} placeholder={t('blogs:add.fields.titlePlh')} />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default AddBlogModal
