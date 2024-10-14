import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TributesApis from '../../../api/tributes'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { removeModal } from '../../../state/shared/modal'
import { addNewTribute, selectTributes } from '../../../state/shared/tributes'
import { UPDATE_TRIBUTE_VALIDATION } from '../../../validations/tributes/update-tribute'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import InputTextarea from '../../core/input/InputTextarea'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

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
      const { data } = await api.patch(TributesApis.patchTribute(toEditTribute!.tributeId), {
        ...values,
      })

      dispatch(addNewTribute(data))
      dispatch(removeModal())
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
