import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TributesApis from '@/src/api/tributes'
import { TributeStatusEnum } from '@/src/enum/tribute'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCertificates } from '@/src/state/shared/certificates'
import { removeModal } from '@/src/state/shared/modal'
import { addNewTribute } from '@/src/state/shared/tributes'
import { CREATE_TRIBUTE_VALIDATION } from '@/src/validations/tributes/create-tribute'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import InputTextarea from '@/src/components/core/input/InputTextarea'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'

const AddTributesForCertificatModal = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)

  const methods = useForm({
    resolver: CREATE_TRIBUTE_VALIDATION,
    defaultValues: {
      certificate: {
        id: `${toEditCertificate?.certificateId}`,
        value: toEditCertificate!.slug,
        name: `${toEditCertificate?.firstName} ${toEditCertificate?.lastName}`,
      },
    },
  })

  return (
    <FormProvider {...methods}>
      <AddTributesForCertificatModalForm />
    </FormProvider>
  )
}

const AddTributesForCertificatModalForm = () => {
  const { t } = useTranslation(['tribute', 'g'])
  const { handleSubmit } = useFormContext()
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { certificate, ...rest } = values

    try {
      const { data } = await api.post(TributesApis.createTribute(), {
        ...rest,
        certificateId: Number(certificate.id),
        status: TributeStatusEnum.ALLOWED,
      })

      dispatch(addNewTribute(data))
      dispatch(removeModal())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('tribute:add.title')} variant="2" size="base" color="grey" />
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

export default AddTributesForCertificatModal
