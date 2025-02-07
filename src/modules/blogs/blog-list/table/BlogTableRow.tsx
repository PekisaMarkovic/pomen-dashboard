import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { formatDateYearMonthDay } from '@/src/utils/date'
import { IBlog } from '@/src/interfaces/blogs'
import { BlogContentTypeEnum } from '@/src/enum'

type Props = {
  blog: IBlog
}

const BlogTableRow = ({ blog }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { blogId, slug, createdAt, updatedAt } = blog
  const linkTo = `${ROUTE_NAMES.blogs}/${blogId}`
  const contentTitle = blog.contents.find((cont) => cont.type === BlogContentTypeEnum.TITLE)

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: () => {
            console.log('TODO')
          },
        },
        textColor: 'red',
      },
    ]
    return options
  }

  return (
    <DefaultTableRowContainer cols={5} dropdownOptions={checkOptions()}>
      <Link to={linkTo} className="col-span-2 py-3 flex">
        <Paragraph text={`${contentTitle?.paragraphs[0].text || slug}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={slug} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={formatDateYearMonthDay(createdAt)} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={updatedAt ? formatDateYearMonthDay(updatedAt) : '-'} size="sm" color="black" noWrap />
      </Link>
    </DefaultTableRowContainer>
  )
}

export default BlogTableRow
