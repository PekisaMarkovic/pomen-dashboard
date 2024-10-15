import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CountriesApis from '../../../api/countries'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { removeToEditCountry, selectCountry, updateCountry } from '../../../state/shared/countries'
import { removeModal } from '../../../state/shared/modal'
import { CREATE_COUNTRY_VALIDATION } from '../../../validations/countries/create-country'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

const EditCountryModal = () => {
  const { toEditCountry } = useAppSelector(selectCountry)
  const methods = useForm({
    resolver: CREATE_COUNTRY_VALIDATION,
    defaultValues: { name: toEditCountry?.name || '', iso: toEditCountry?.iso || '', code: toEditCountry?.code || '' },
  })

  return (
    <FormProvider {...methods}>
      <EditCountryModalForm />
    </FormProvider>
  )
}

const EditCountryModalForm = () => {
  const { toEditCountry } = useAppSelector(selectCountry)
  const { t } = useTranslation(['country', 'g'])
  const { handleSubmit } = useFormContext()
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { data } = await api.patch(CountriesApis.patchCountry(toEditCountry!.countryId), { ...values })

      dispatch(updateCountry(data))
      dispatch(removeModal())
      dispatch(removeToEditCountry())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('country:add.editTitle')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        <InputText isRequired name="name" label={t('country:add.fields.name')} placeholder={t('country:add.fields.namePlh')} />

        <InputText isRequired name="iso" label={t('country:add.fields.iso')} placeholder={t('country:add.fields.isoPlh')} />

        <InputText isRequired name="code" label={t('country:add.fields.code')} placeholder={t('country:add.fields.codePlh')} />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default EditCountryModal
