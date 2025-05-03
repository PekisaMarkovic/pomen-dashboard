import GetheringsApis from '@/src/api/getherings'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import DateSelect from '@/src/components/core/select/DateSelect'
import SingleSelect from '@/src/components/core/select/SingleSelect'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'
import { TIME_OPTIONS } from '@/src/constatns/select'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { removeToEditGethering, selectGetherings, updateGethering } from '@/src/state/shared/getherings'
import { removeModal } from '@/src/state/shared/modal'
import { formatToIsoDate } from '@/src/utils/date'
import { UPDATE_GETHERING_VALIDATION } from '@/src/validations/getherings/update-gethering'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const EditGetheringModal = () => {
  const { toEditGethering } = useAppSelector(selectGetherings)

  const hour = TIME_OPTIONS.find((time) => time.value === `${toEditGethering!.hour}`)

  const methods = useForm({
    resolver: UPDATE_GETHERING_VALIDATION,
    defaultValues: {
      getheringDate: toEditGethering?.getheringDate || undefined,
      address: toEditGethering?.address || '',
      hour,
    },
  })

  return (
    <FormProvider {...methods}>
      <EditGetheringModalForm />
    </FormProvider>
  )
}

const EditGetheringModalForm = () => {
  const { t } = useTranslation(['gethering', 'g'])
  const { handleSubmit } = useFormContext()
  const { toEditGethering } = useAppSelector(selectGetherings)
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { address, getheringDate, hour: selectedHour } = values
    try {
      const { data } = await api.patch(GetheringsApis.patchGethering(toEditGethering!.getheringId), {
        address,
        getheringDate: formatToIsoDate(getheringDate),
        hour: Number(selectedHour.value),
      })

      dispatch(updateGethering(data))
      dispatch(removeModal())
      dispatch(removeToEditGethering())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('cemetery:add.editTitle')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
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

export default EditGetheringModal
