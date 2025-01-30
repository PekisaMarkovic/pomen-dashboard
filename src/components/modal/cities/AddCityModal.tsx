import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CitiesApis from '@/src/api/cities'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { addNewCountry, selectCountry } from '@/src/state/shared/countries'
import { removeModal } from '@/src/state/shared/modal'
import { CREATE_CITY_VALIDATION } from '@/src/validations/cities/create-city'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'
import { mapCountryDropdownToSelectOptions } from '@/src/mapper/options'
import SingleSelect from '@/src/components/core/select/SingleSelect'

const AddCityModal = () => {
  const methods = useForm({ resolver: CREATE_CITY_VALIDATION })

  return (
    <FormProvider {...methods}>
      <AddCityModalForm />
    </FormProvider>
  )
}

const AddCityModalForm = () => {
  const { t } = useTranslation(['city', 'g'])
  const { handleSubmit } = useFormContext()
  const { dropdownOptions } = useAppSelector(selectCountry)
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { data } = await api.post(CitiesApis.createCity(), { ...values })

      dispatch(addNewCountry(data))
      dispatch(removeModal())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('city:add.title')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        {dropdownOptions.isLoad && (
          <SingleSelect
            name="country"
            options={mapCountryDropdownToSelectOptions(dropdownOptions.options)}
            label={t('city:add.fields.country')}
            placeholder={t('city:add.fields.countryPlh')}
          />
        )}

        <InputText isRequired name="name" label={t('city:add.fields.name')} placeholder={t('city:add.fields.namePlh')} />

        <InputText isRequired name="code" label={t('city:add.fields.code')} placeholder={t('city:add.fields.codePlh')} />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default AddCityModal
