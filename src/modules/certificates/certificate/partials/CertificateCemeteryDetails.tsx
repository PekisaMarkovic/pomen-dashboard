import { useTranslation } from 'react-i18next'
import DataSection from '@/src/components/section/DataSection'
import SingleSelect from '@/src/components/core/select/SingleSelect'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCemeteries } from '@/src/state/shared/cemeteries'
import { mapCemeteryDropdownToSelectOptions, mapCityDropdownToSelectOptions } from '@/src/mapper/options'
import { selectCities } from '@/src/state/shared/cities'
import { useFormContext, useWatch } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { SelectOption } from '@/src/interfaces'

const CertificateCemeteryDetails = () => {
  const cityOption = useWatch({ name: 'city' })
  const { dropdownOptions: cemeteryDropdownOptions } = useAppSelector(selectCemeteries)
  const { dropdownOptions: cityDropdownOptions } = useAppSelector(selectCities)
  const [cemeteryOptions, setCemeteryOptions] = useState<SelectOption[]>([])
  const { t } = useTranslation(['certificate'])
  const { setValue } = useFormContext()

  const handleOnSelectCityCallback = useCallback(() => {
    if (cityOption?.id) {
      setValue('cemetery', '')
      setCemeteryOptions(mapCemeteryDropdownToSelectOptions(cemeteryDropdownOptions.options.filter((opt) => opt.cityId === Number(cityOption.id))))
    } else {
      setCemeteryOptions(mapCemeteryDropdownToSelectOptions(cemeteryDropdownOptions.options))
    }
  }, [cityOption, cemeteryDropdownOptions])

  return (
    <DataSection tooltip={t('certificate:cemetery.tooltip')} title={t('certificate:cemetery.title')} subtitle={t('certificate:cemetery.subtitle')}>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        {cityDropdownOptions.isLoad && (
          <SingleSelect
            name="city"
            options={mapCityDropdownToSelectOptions(cityDropdownOptions.options)}
            label={t('certificate:cemetery.fields.city')}
            placeholder={t('certificate:cemetery.fields.cityPlh')}
            onClickCallback={handleOnSelectCityCallback}
          />
        )}

        {cemeteryDropdownOptions.isLoad && (
          <SingleSelect
            isRequired
            name="cemetery"
            options={cemeteryOptions}
            label={t('certificate:cemetery.fields.cemetery')}
            placeholder={t('certificate:cemetery.fields.cemeteryPlh')}
          />
        )}
      </div>
    </DataSection>
  )
}

export default CertificateCemeteryDetails
