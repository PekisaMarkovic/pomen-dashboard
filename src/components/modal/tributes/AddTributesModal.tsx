import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TributesApis from '../../../api/tributes'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../state/shared/certificates'
import { removeModal } from '../../../state/shared/modal'
import { addNewTribute } from '../../../state/shared/tributes'
import { mapCertificateDropdownToSelectOptions } from '../../../mapper/options'
import { CREATE_TRIBUTE_VALIDATION } from '../../../validations/tributes/create-tribute'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import InputTextarea from '../../core/input/InputTextarea'
import SingleSelect from '../../core/select/SingleSelect'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

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
        certificateId: certificate.id,
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
