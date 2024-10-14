import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import GetheringsApis from '../../../api/getherings'
import { TIME_OPTIONS } from '../../../constatns/select'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../state/shared/certificates'
import { selectCities } from '../../../state/shared/cities'
import { addNewGethering } from '../../../state/shared/getherings'
import { removeModal } from '../../../state/shared/modal'
import { formatDateYearMonthDay } from '../../../utils/date'
import { mapCertificateDropdownToSelectOptions, mapCityDropdownToSelectOptions } from '../../../mapper/options'
import { CREATE_GETHERING_VALIDATION } from '../../../validations/getherings/create-gethering'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import DateSelect from '../../core/select/DateSelect'
import SingleSelect from '../../core/select/SingleSelect'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

const AddGetheringModal = () => {
  const methods = useForm({ resolver: CREATE_GETHERING_VALIDATION })

  return (
    <FormProvider {...methods}>
      <AddGetheringModalForm />
    </FormProvider>
  )
}

const AddGetheringModalForm = () => {
  const { t } = useTranslation(['gethering', 'g'])
  const { handleSubmit } = useFormContext()
  const { dropdownOptions: cityDropdownOptions } = useAppSelector(selectCities)
  const { dropdownOptions: certificateDropdownOptions } = useAppSelector(selectCertificates)
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { city, getheringDate, certificate, hour: selectedHour, address: partOfAddress } = values

    const address = `${partOfAddress}, ${city.value}, ${city.name}`

    try {
      const { data } = await api.post(GetheringsApis.createGethering(), {
        address,
        certificateId: certificate.id,
        getheringDate: formatDateYearMonthDay(getheringDate),
        hour: Number(selectedHour.value),
      })

      dispatch(addNewGethering(data))
      dispatch(removeModal())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('gethering:add.title')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        {certificateDropdownOptions.isLoad && (
          <SingleSelect
            name="certificate"
            options={mapCertificateDropdownToSelectOptions(certificateDropdownOptions.options)}
            label={t('gethering:add.fields.certificate')}
            placeholder={t('gethering:add.fields.certificatePlh')}
          />
        )}

        {cityDropdownOptions.isLoad && (
          <SingleSelect
            name="city"
            options={mapCityDropdownToSelectOptions(cityDropdownOptions.options)}
            label={t('gethering:add.fields.city')}
            placeholder={t('gethering:add.fields.cityPlh')}
          />
        )}

        <DateSelect isRequired name="getheringDate" label={t('gethering:add.fields.date')} placeholder={t('gethering:add.fields.datePlh')} />

        <SingleSelect
          isRequired
          name="hour"
          options={TIME_OPTIONS}
          label={t('gethering:add.fields.hour')}
          placeholder={t('gethering:add.fields.hourPlh')}
        />

        <InputText isRequired name="address" label={t('gethering:add.fields.address')} placeholder={t('gethering:add.fields.addressPlh')} />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default AddGetheringModal
