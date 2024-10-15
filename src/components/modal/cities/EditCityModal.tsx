import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CitiesApis from '../../../api/cities'
import { useApi } from '../../../hooks/use-api'
import { mapCountryDropdownToSelectOptions } from '../../../mapper/options'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { removeToEditCity, selectCities, updateCity } from '../../../state/shared/cities'
import { selectCountry } from '../../../state/shared/countries'
import { removeModal } from '../../../state/shared/modal'
import { CREATE_CITY_VALIDATION } from '../../../validations/cities/create-city'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import SingleSelect from '../../core/select/SingleSelect'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

const EditCityModal = () => {
  const { toEditCity } = useAppSelector(selectCities)
  const methods = useForm({
    resolver: CREATE_CITY_VALIDATION,
    defaultValues: {
      name: toEditCity?.name || '',
      code: toEditCity?.code || '',
      country: { id: toEditCity?.country?.countryId, name: toEditCity?.country?.name, value: toEditCity?.country?.code },
    },
  })

  return (
    <FormProvider {...methods}>
      <EditCityModalForm />
    </FormProvider>
  )
}

const EditCityModalForm = () => {
  const { toEditCity } = useAppSelector(selectCities)
  const { dropdownOptions } = useAppSelector(selectCountry)

  const { t } = useTranslation(['city', 'g'])
  const { handleSubmit } = useFormContext()
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { data } = await api.patch(CitiesApis.patchCity(toEditCity!.cityId), { ...values })

      dispatch(updateCity(data))
      dispatch(removeModal())
      dispatch(removeToEditCity())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('city:add.editTitle')} variant="2" size="base" color="grey" />
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

export default EditCityModal
