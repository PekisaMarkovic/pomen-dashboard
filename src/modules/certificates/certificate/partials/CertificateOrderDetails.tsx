import { useTranslation } from 'react-i18next'
import DataSection from '@/src/components/section/DataSection'
import InputText from '@/src/components/core/input/InputText'
import SingleSelect from '@/src/components/core/select/SingleSelect'
import { selectPricings } from '@/src/state/shared/pricings'
import { mapPricingDropdownToSelectOptions } from '@/src/mapper/options'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'

const CertificateOrderDetails = () => {
  const { t } = useTranslation(['certificate'])
  const { dropdownOptions: pricingDropdownOptions } = useAppSelector(selectPricings)

  return (
    <DataSection tooltip={t('certificate:order.tooltip')} title={t('certificate:order.title')} subtitle={t('certificate:order.subtitle')}>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        <InputText
          isRequired
          name="firstNameNewUser"
          label={t('certificate:order.fields.firstNameNewUser')}
          placeholder={t('certificate:order.fields.firstNameNewUserPlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          name="lastNameNewUser"
          label={t('certificate:order.fields.lastNameNewUser')}
          placeholder={t('certificate:order.fields.lastNameNewUserPlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          name="emailNewUser"
          label={t('certificate:order.fields.emailNewUser')}
          placeholder={t('certificate:order.fields.emailNewUserPlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          name="phoneNewUser"
          label={t('certificate:order.fields.phoneNewUser')}
          placeholder={t('certificate:order.fields.phoneNewUserPlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          name="addressOrder"
          label={t('certificate:order.fields.addressOrder')}
          placeholder={t('certificate:order.fields.addressOrderPlh')}
          typeHtml="text"
        />

        {pricingDropdownOptions.isLoad && (
          <SingleSelect
            name="pricingPlan"
            options={mapPricingDropdownToSelectOptions(pricingDropdownOptions.options)}
            label={t('certificate:order.fields.plan')}
            placeholder={t('certificate:order.fields.planPlh')}
          />
        )}
      </div>
    </DataSection>
  )
}

export default CertificateOrderDetails
