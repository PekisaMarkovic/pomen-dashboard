import { useTranslation } from 'react-i18next'
import Heading from '@/src/components/core/typography/Heading'

const BlogTableHeader = () => {
  const { t } = useTranslation(['blogs'])

  return (
    <div className="border-b-1 border-b-light-grey-alt border-solid px-4 pb-3 pt-4">
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <Heading text={t('blogs:table.title')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('blogs:table.slug')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('blogs:table.createdAt')} variant="2" size="sm" color="grey" weight="medium" />
        </div>

        <div className="flex">
          <Heading text={t('blogs:table.updatedAt')} variant="2" size="sm" color="grey" weight="medium" />
        </div>
      </div>
    </div>
  )
}

export default BlogTableHeader
