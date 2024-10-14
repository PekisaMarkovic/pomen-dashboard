import { useTranslation } from 'react-i18next'
import Heading from '../../../../components/core/typography/Heading'

const GetheringTableHeader = () => {
  const { t } = useTranslation(['gethering'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-7">
        <div className="flex">
          <Heading text={t('gethering:table.date')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('gethering:table.hour')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-3">
          <Heading text={t('gethering:table.address')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2">
          <Heading text={t('gethering:table.certificate')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default GetheringTableHeader
