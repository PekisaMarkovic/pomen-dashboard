import { useTranslation } from 'react-i18next'
import Heading from '../../../../components/core/typography/Heading'

const CemeteryTableHeader = () => {
  const { t } = useTranslation(['cemetery'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-5">
        <div className="flex">
          <Heading text={t('cemetery:table.name')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('cemetery:table.slug')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('cemetery:table.city')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2">
          <Heading text={t('cemetery:table.address')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default CemeteryTableHeader
