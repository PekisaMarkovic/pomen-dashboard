import { useTranslation } from 'react-i18next'
import Heading from '../../../../components/core/typography/Heading'

const CertificateTableHeader = () => {
  const { t } = useTranslation(['certificate'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-9">
        <div className="col-span-2">
          <Heading text={t('certificate:table.name')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('certificate:table.born')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('certificate:table.died')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-3">
          <Heading text={t('certificate:table.cemetery')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2">
          <Heading text={t('certificate:table.biography')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default CertificateTableHeader
