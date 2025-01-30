import { useTranslation } from 'react-i18next'
import Heading from '@/src/components/core/typography/Heading'

const ContactTableHeader = () => {
  const { t } = useTranslation(['contact'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-7">
        <div className="flex">
          <Heading text={t('contact:table.name')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-2 flex">
          <Heading text={t('contact:table.email')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('contact:table.status')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="col-span-3">
          <Heading text={t('contact:table.message')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default ContactTableHeader
