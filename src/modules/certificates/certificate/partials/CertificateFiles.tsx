import { useTranslation } from 'react-i18next'

import DataSection from '../../../../components/section/DataSection'
import { FileTypeEnum } from '../../../../enum/file'
import InputFile from '../../../../components/core/input/InputFile'
import MultyInputFile from '../../../../components/core/input/MultyInputFile'

const CertificateFiles = () => {
  const { t } = useTranslation(['certificate'])

  return (
    <DataSection tooltip={t('certificate:files.tooltip')} title={t('certificate:files.title')} subtitle={t('certificate:files.subtitle')}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          <InputFile
            name="profileImage"
            label={t('certificate:files.fields.profileImage')}
            placeholderGreen={t('certificate:files.fields.greenPlh')}
            placeholderGrey={t('certificate:files.fields.greyPlh')}
          />
        </div>

        <MultyInputFile
          name="images"
          label={t('certificate:files.fields.images')}
          placeholderGreen={t('certificate:files.fields.greenPlh')}
          placeholderGrey={t('certificate:files.fields.greyPlh')}
        />

        <MultyInputFile
          name="videos"
          fileType={FileTypeEnum.VIDEO}
          label={t('certificate:files.fields.videos')}
          placeholderGreen={t('certificate:files.fields.greenPlhV')}
          placeholderGrey={t('certificate:files.fields.greyPlh')}
        />
      </div>
    </DataSection>
  )
}

export default CertificateFiles
