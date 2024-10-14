import { useTranslation } from 'react-i18next'
import Heading from '../../../../components/core/typography/Heading'

const TributeTableHeader = () => {
  const { t } = useTranslation(['tribute'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-9">
        <div className="col-span-3">
          <Heading text={t('tribute:table.description')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2">
          <Heading text={t('tribute:table.name')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('tribute:table.email')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2">
          <Heading text={t('tribute:table.certificate')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('tribute:table.status')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default TributeTableHeader
