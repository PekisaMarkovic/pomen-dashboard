import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CemeteriesApis from '../../../api/cemeteries'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { addNewCemetery, selectCemeteries } from '../../../state/shared/cemeteries'
import { selectCities } from '../../../state/shared/cities'
import { removeModal } from '../../../state/shared/modal'
import { mapCityDropdownToSelectOptions } from '../../../mapper/options'
import { CREATE_CEMETERY_VALIDATION } from '../../../validations/cemetereis/create-cemetery'
import MainButton from '../../core/buttons/MainButton'
import InputText from '../../core/input/InputText'
import SingleSelect from '../../core/select/SingleSelect'
import customToast from '../../core/toast/CustomToast'
import Heading from '../../core/typography/Heading'

const EditCemeteryModal = () => {
  const { toEditCemetery } = useAppSelector(selectCemeteries)
  const methods = useForm({
    resolver: CREATE_CEMETERY_VALIDATION,
    defaultValues: {
      name: toEditCemetery?.name || '',
      address: toEditCemetery?.address || '',
      city: { id: `${toEditCemetery?.city?.cityId}`, name: toEditCemetery?.city?.name || '', value: toEditCemetery?.city?.code || '' },
    },
  })

  return (
    <FormProvider {...methods}>
      <EditCemeteryModalForm />
    </FormProvider>
  )
}

const EditCemeteryModalForm = () => {
  const { t } = useTranslation(['cemetery', 'g'])
  const { handleSubmit } = useFormContext()
  const { dropdownOptions } = useAppSelector(selectCities)
  const { toEditCemetery } = useAppSelector(selectCemeteries)
  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { city, ...rest } = values
    try {
      const { data } = await api.patch(CemeteriesApis.patchCemetery(toEditCemetery!.cemeteryId), {
        ...rest,
        cityId: city?.id,
      })

      dispatch(addNewCemetery(data))
      dispatch(removeModal())
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <Heading text={t('cemetery:add.editTitle')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        {dropdownOptions.isLoad && (
          <SingleSelect
            name="city"
            options={mapCityDropdownToSelectOptions(dropdownOptions.options)}
            label={t('cemetery:add.fields.city')}
            placeholder={t('cemetery:add.fields.cityPlh')}
          />
        )}

        <InputText isRequired name="name" label={t('cemetery:add.fields.name')} placeholder={t('cemetery:add.fields.namePlh')} />

        <InputText isRequired name="address" label={t('cemetery:add.fields.address')} placeholder={t('cemetery:add.fields.addressPlh')} />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default EditCemeteryModal
