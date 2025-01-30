import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TributesApis from '@/src/api/tributes'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCertificates } from '@/src/state/shared/certificates'
import { removeModal } from '@/src/state/shared/modal'
import { addNewTribute } from '@/src/state/shared/tributes'
import { mapCertificateDropdownToSelectOptions } from '@/src/mapper/options'
import { CREATE_TRIBUTE_VALIDATION } from '@/src/validations/tributes/create-tribute'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import InputTextarea from '@/src/components/core/input/InputTextarea'
import SingleSelect from '@/src/components/core/select/SingleSelect'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'
import { TributeStatusEnum } from '@/src/enum/tribute'

const AddTributesModal = () => {
  const methods = useForm({ resolver: CREATE_TRIBUTE_VALIDATION })

  return (
    <FormProvider {...methods}>
      <AddTributesModalForm />
    </FormProvider>
  )
}

const AddTributesModalForm = () => {
  const { t } = useTranslation(['tribute', 'g'])
  const { handleSubmit } = useFormContext()
  const { dropdownOptions: certificateDropdownOptions } = useAppSelector(selectCertificates)
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
        {certificateDropdownOptions.isLoad && (
          <SingleSelect
            name="certificate"
            options={mapCertificateDropdownToSelectOptions(certificateDropdownOptions.options)}
            label={t('tribute:add.fields.certificate')}
            placeholder={t('tribute:add.fields.certificatePlh')}
          />
        )}

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

export default AddTributesModal
