import { useTranslation } from 'react-i18next'
import Heading from '../../../../components/core/typography/Heading'

const OrderTableHeader = () => {
  const { t } = useTranslation(['order'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-10">
        <div className="col-span-3">
          <Heading text={t('order:table.name')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-3">
          <Heading text={t('order:table.address')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2">
          <Heading text={t('order:table.slug')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div>
          <Heading text={t('order:table.status')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div>
          <Heading text={t('order:table.createdAt')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default OrderTableHeader
