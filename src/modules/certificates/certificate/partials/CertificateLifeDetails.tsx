import { useTranslation } from 'react-i18next'
import DataSection from '../../../../components/section/DataSection'
import InputText from '../../../../components/core/input/InputText'
import DateSelect from '../../../../components/core/select/DateSelect'
import InputTextarea from '../../../../components/core/input/InputTextarea'

// biography,

const CertificateLifeDetails = () => {
  const { t } = useTranslation(['certificate'])
  return (
    <DataSection tooltip={t('certificate:life.tooltip')} title={t('certificate:life.title')} subtitle={t('certificate:life.subtitle')}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <InputText
          isRequired
          name="firstName"
          label={t('certificate:life.fields.firstName')}
          placeholder={t('certificate:life.fields.firstNamePlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          name="lastName"
          label={t('certificate:life.fields.lastName')}
          placeholder={t('certificate:life.fields.lastNamePlh')}
          typeHtml="text"
        />

        <DateSelect
          isRequired
          name="dateOfBirth"
          label={t('certificate:life.fields.dateOfBirth')}
          placeholder={t('certificate:life.fields.dateOfBirthPlh')}
        />

        <InputText
          isRequired
          name="placeOfBirth"
          label={t('certificate:life.fields.placeOfBirth')}
          placeholder={t('certificate:life.fields.placeOfBirthPlh')}
          typeHtml="text"
        />

        <DateSelect
          isRequired
          name="dateOfDeath"
          label={t('certificate:life.fields.dateOfDeath')}
          placeholder={t('certificate:life.fields.dateOfDeathPlh')}
        />

        <InputText
          isRequired
          name="placeOfDeath"
          label={t('certificate:life.fields.placeOfDeath')}
          placeholder={t('certificate:life.fields.placeOfDeathPlh')}
          typeHtml="text"
        />

        <div className="col-span-2">
          <InputTextarea
            name="biography"
            isRequired
            label={t('certificate:life.fields.biography')}
            placeholder={t('certificate:life.fields.biographyPlh')}
            maxChar={480}
          />
        </div>
      </div>
    </DataSection>
  )
}

export default CertificateLifeDetails
