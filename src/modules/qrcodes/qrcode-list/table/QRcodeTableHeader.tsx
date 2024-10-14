import { useTranslation } from 'react-i18next'
import Heading from '../../../../components/core/typography/Heading'

const QRcodeTableHeader = () => {
  const { t } = useTranslation(['qrcode'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-6">
        <div className="flex">
          <Heading text={t('qrcode:table.code')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex col-span-2">
          <Heading text={t('qrcode:table.name')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex col-span-2">
          <Heading text={t('qrcode:table.slug')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('qrcode:table.createAt')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default QRcodeTableHeader
