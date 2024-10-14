import { useTranslation } from 'react-i18next'
import DataSection from '../../../../components/section/DataSection'
import SingleSelect from '../../../../components/core/select/SingleSelect'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCemeteries } from '../../../../state/shared/cemeteries'
import { mapCemeteryDropdownToSelectOptions, mapCityDropdownToSelectOptions } from '../../../../mapper/options'
import { selectCities } from '../../../../state/shared/cities'
import { useFormContext, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { SelectOption } from '../../../../interfaces/general'

const CertificateCemeteryDetails = () => {
  const cityOption = useWatch({ name: 'city' })
  const { dropdownOptions: cemeteryDropdownOptions } = useAppSelector(selectCemeteries)
  const { dropdownOptions: cityDropdownOptions } = useAppSelector(selectCities)
  const [cemeteryOptions, setCemeteryOptions] = useState<SelectOption[]>([])
  const { t } = useTranslation(['certificate'])
  const { setValue } = useFormContext()

  useEffect(() => {
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
