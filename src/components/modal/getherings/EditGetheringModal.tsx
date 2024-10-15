import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import GetheringsApis from '../../../api/getherings'
import { TIME_OPTIONS } from '../../../constatns/select'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { removeToEditGethering, selectGetherings, updateGethering } from '../../../state/shared/getherings'
import { removeModal } from '../../../state/shared/modal'
import { formatDateYearMonthDay } from '../../../utils/date'
import { UPDATE_GETHERING_VALIDATION } from '../../../validations/getherings/update-gethering'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import DateSelect from '../../core/select/DateSelect'
import SingleSelect from '../../core/select/SingleSelect'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

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
        getheringDate: formatDateYearMonthDay(getheringDate),
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
