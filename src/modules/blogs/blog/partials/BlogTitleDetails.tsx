import MainButton from '@/src/components/core/buttons/MainButton'
import Heading from '@/src/components/core/typography/Heading'
import { BlogContentTypeEnum } from '@/src/enum'
import { IBlogContentEdit } from '@/src/interfaces/blogs'
import { mapBlogContentTypeToSelectOptions } from '@/src/mapper/options'
import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  title: string
}

const BlogTitleDetails = ({ title }: Props) => {
  const { t } = useTranslation(['g'])
  const { setValue } = useFormContext()
  const blog = useWatch({ name: 'blog' })
  const contents: IBlogContentEdit[] = blog.contents
  const isEverySingleCreated = contents.every((cont) => cont.blogContentId)

  const handleAddNewContent = useCallback(() => {
    const type = mapBlogContentTypeToSelectOptions(true).find((o) => o.value === BlogContentTypeEnum.TEXT_CENTER)
    setValue('blog.contents', [
      ...contents,
      {
        order: contents.length,
        paragraphs: [
          {
            text: '',
            order: '1',
            isBold: { id: '0', name: '', value: '', checked: false },
          },
        ],
        type,
      },
    ])
  }, [contents])

  return (
    <div className="flex items-center justify-between mt-4 mb-10">
      <div />
      <Heading text={title} variant="2" size="base" color="black" />
      <div>
        {isEverySingleCreated && (
          <MainButton text={t('blogs:add.content')} variant="contained" size="medium" htmlType="button" onClick={handleAddNewContent} />
        )}
      </div>
    </div>
  )
}

export default BlogTitleDetails
