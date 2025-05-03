import GetheringsApis from '@/src/api/getherings'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import DateSelect from '@/src/components/core/select/DateSelect'
import SingleSelect from '@/src/components/core/select/SingleSelect'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'
import { TIME_OPTIONS } from '@/src/constatns/select'
import { useApi } from '@/src/hooks/use-api'
import { mapCityDropdownToSelectOptions } from '@/src/mapper/options'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCertificates } from '@/src/state/shared/certificates'
import { selectCities } from '@/src/state/shared/cities'
import { addNewGethering } from '@/src/state/shared/getherings'
import { removeModal } from '@/src/state/shared/modal'
import { formatToIsoDate } from '@/src/utils/date'
import { CREATE_GETHERING_VALIDATION } from '@/src/validations/getherings/create-gethering'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const AddGetheringForCertifivateModal = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)

  const methods = useForm({
    resolver: CREATE_GETHERING_VALIDATION,
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
      <AddGetheringForCertifivateModalForm />
    </FormProvider>
  )
}

const AddGetheringForCertifivateModalForm = () => {
  const { t } = useTranslation(['gethering', 'g'])
  const { handleSubmit } = useFormContext()
  const { dropdownOptions: cityDropdownOptions } = useAppSelector(selectCities)
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { city, getheringDate, certificate, hour: selectedHour, address: partOfAddress } = values

    const address = `${partOfAddress}, ${city.value}, ${city.name}`

    try {
      const { data } = await api.post(GetheringsApis.createGethering(), {
        address,
        certificateId: Number(certificate.id),
        getheringDate: formatToIsoDate(getheringDate),
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

export default AddGetheringForCertifivateModal
