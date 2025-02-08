import BlogApis from '@/src/api/blog'
import CustomDropdowns from '@/src/components/core/dropdowns/CustomDropdowns'
import InputTextarea from '@/src/components/core/input/InputTextarea'
import { useApi } from '@/src/hooks/use-api'
import { useClickAway } from '@/src/hooks/use-click-outside'
import GeneralIcons from '@/src/icons/general'
import { IBlogText, IBlogTextEdit } from '@/src/interfaces/blogs'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import customToast from '@/src/components/core/toast/CustomToast'
import { useFormContext, useWatch } from 'react-hook-form'
import Checkbox from '@/src/components/core/checkbox/Checkbox'
import InputText from '@/src/components/core/input/InputText'

type Props = {
  text: IBlogTextEdit
  isReadOnly: boolean
  contentIndex: number
  paragraphIndex: number
  isTitle: boolean
}

const BlogText = ({ contentIndex, paragraphIndex, isReadOnly, text, isTitle }: Props) => {
  const namePath = `blog.contents[${contentIndex}].paragraphs[${paragraphIndex}]`
  const { t } = useTranslation(['blogs'])
  const [open, setOpen] = useState<boolean>(false)
  const api = useApi()
  const paragaphsName = `blog.contents[${contentIndex}].paragraphs`
  const paragraphs = useWatch({ name: paragaphsName })
  const { setValue } = useFormContext()

  const handleRemoveByIndex = () => {
    setValue(
      paragaphsName,
      paragraphs.filter((_: IBlogText, index: number) => index !== paragraphIndex),
    )
  }

  const handleClose = useCallback(() => setOpen(false), [])

  const clickAwayRef = useClickAway<HTMLDivElement>({ clickAwayCallback: handleClose })

  const handleOnClick = () => setOpen(!open)

  const handleDelete = useCallback(async () => {
    try {
      if (text.blogTextId !== null && text.blogTextId !== undefined) {
        await api.delete(BlogApis.deleteBlogText(text.blogTextId!))

        handleRemoveByIndex()
      } else {
        handleRemoveByIndex()
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const options: CustomDropdown[] = [
    {
      content: {
        type: 'button',
        text: t('g:button.delete'),
        onClick: handleDelete,
      },
      textColor: 'red',
    },
  ]

  return (
    <div className="relative col-span-3">
      <InputTextarea
        name={`${namePath}.text`}
        isRequired
        label={t('blogs:add.fields.text')}
        placeholder={t('blogs:add.fields.textPlh')}
        maxChar={480}
        isDisabled={isReadOnly}
      />
      {!isTitle && (
        <div className="flex gap-3">
          <InputText isRequired name={`${namePath}.order`} label={t('blogs:add.fields.order')} placeholder={t('blogs:add.fields.orderPlh')} />
          <Checkbox label={t('blogs:add.fields.isBold')} name={`${namePath}.isBold`} disabled={isReadOnly} />
        </div>
      )}

      {!isReadOnly && (
        <div className={`absolute top-5 -translate-y-2/4 right-2 ${open ? 'z-4' : 'z-2'}`} ref={clickAwayRef}>
          <div className="relative">
            <GeneralIcons type="MoreIcon" className="cursor-pointer z-1" onClick={handleOnClick} />
            {open && <CustomDropdowns dropdownOptions={options} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogText
