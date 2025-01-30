import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TributesApis from '@/src/api/tributes'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { removeModal } from '@/src/state/shared/modal'
import { removeToEditTribute, selectTributes, updateTribute } from '@/src/state/shared/tributes'
import { UPDATE_TRIBUTE_VALIDATION } from '@/src/validations/tributes/update-tribute'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import InputTextarea from '@/src/components/core/input/InputTextarea'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'

const EditTributeModal = () => {
  const { toEditTribute } = useAppSelector(selectTributes)

  const methods = useForm({
    resolver: UPDATE_TRIBUTE_VALIDATION,
    defaultValues: {
      description: toEditTribute?.description || '',
      email: toEditTribute?.email || '',
      firstName: toEditTribute?.firstName || '',
      lastName: toEditTribute?.lastName || '',
    },
  })

  return (
    <FormProvider {...methods}>
      <EditTributeModalForm />
    </FormProvider>
  )
}

const EditTributeModalForm = () => {
  const { t } = useTranslation(['tribute', 'g'])
  const { handleSubmit } = useFormContext()
  const { toEditTribute } = useAppSelector(selectTributes)
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { data } = await api.patch(TributesApis.patchTribute(toEditTribute!.tributeId), values)

      dispatch(updateTribute(data))
      dispatch(removeModal())
      dispatch(removeToEditTribute())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('tribute:add.editTitle')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        <InputText isRequired name="firstName" label={t('tribute:add.fields.firstName')} placeholder={t('tribute:add.fields.firstNamePlh')} />

        <InputText isRequired name="lastName" label={t('tribute:add.fields.lastName')} placeholder={t('tribute:add.fields.lastNamePlh')} />

        <InputText isRequired name="email" label={t('tribute:add.fields.email')} placeholder={t('tribute:add.fields.emailPlh')} />

        <InputTextarea
          name="description"
          isRequired
          label={t('tribute:add.fields.description')}
          placeholder={t('tribute:add.fields.descriptionPlh')}
          maxChar={480}
        />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default EditTributeModal
