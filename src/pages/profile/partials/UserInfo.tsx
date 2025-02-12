import { useTranslation } from 'react-i18next'
import DataSection from '@/src/components/section/DataSection'
import InputText from '@/src/components/core/input/InputText'
import InputFile from '@/src/components/core/input/InputFile'
import DateSelect from '@/src/components/core/select/DateSelect'

const UserInfo = () => {
  const { t } = useTranslation(['user'])
  return (
    <DataSection tooltip={t('user:info.tooltip')} title={t('user:info.title')} subtitle={t('user:info.subtitle')}>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        <InputText
          isRequired
          name="firstName"
          label={t('user:info.fields.firstName')}
          placeholder={t('user:info.fields.firstNamePlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          name="lastName"
          label={t('user:info.fields.lastName')}
          placeholder={t('user:info.fields.lastNamePlh')}
          typeHtml="text"
        />

        <InputText
          isRequired
          disabled
          name="email"
          label={t('user:info.fields.email')}
          placeholder={t('user:info.fields.emailPlh')}
          typeHtml="text"
        />

        <InputText isRequired name="phoneNumber" label={t('user:info.fields.phone')} placeholder={t('user:info.fields.phonePlh')} typeHtml="text" />

        <DateSelect isRequired name="dateOfBirth" label={t('user:info.fields.dateOfBirth')} placeholder={t('user:info.fields.dateOfBirthPlh')} />

        <InputText isRequired name="gender" label={t('user:info.fields.gender')} placeholder={t('user:info.fields.genderPlh')} typeHtml="text" />

        <div className="col-span-3 gap-x-6 gap-y-4">
          <InputFile
            name="profileImage"
            label={t('user:info.fields.profileImage')}
            placeholderGreen={t('certificate:files.fields.greenPlh')}
            placeholderGrey={t('certificate:files.fields.greyPlh')}
          />
        </div>
      </div>
    </DataSection>
  )
}

export default UserInfo
