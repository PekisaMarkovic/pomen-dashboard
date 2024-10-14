import { useTranslation } from 'react-i18next'
import DataSection from '../../../../components/section/DataSection'
import InputText from '../../../../components/core/input/InputText'

const CertificateOrderDetails = () => {
  const { t } = useTranslation(['certificate'])
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
      </div>
    </DataSection>
  )
}

export default CertificateOrderDetails
