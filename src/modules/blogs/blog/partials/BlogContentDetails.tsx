import { useTranslation } from 'react-i18next'
import DataSection from '@/src/components/section/DataSection'
import InputFile from '@/src/components/core/input/InputFile'
import SingleSelect from '@/src/components/core/select/SingleSelect'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { Fragment, useCallback, useState } from 'react'
import MainButton from '@/src/components/core/buttons/MainButton'
import { IBlog, IBlogContentEdit } from '@/src/interfaces/blogs'
import { useFormContext, useWatch } from 'react-hook-form'
import { BlogContentTypeEnum, FileTypeEnum } from '@/src/enum'
import { mapBlogContentTypeToSelectOptions } from '@/src/mapper/options'
import BlogText from '@/src/modules/blogs/blog/partials/BlogText'
import BlogApis from '@/src/api/blog'
import { useApi } from '@/src/hooks/use-api'
import customToast from '@/src/components/core/toast/CustomToast'
import FileApis from '@/src/api/files'
import { ICreateFile } from '@/src/interfaces/image'
import { selectBehaviours } from '@/src/state/shared/behaviours'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import InputText from '@/src/components/core/input/InputText'
import get from 'lodash.get'
import ErrorMessage from '@/src/components/core/typography/ErrorMessage'

type Props = {
  blogId: number
  index: number
  content: IBlogContentEdit
}

const BlogContentDetails = ({ index, content, blogId }: Props) => {
  const pathName = `blog.contents[${index}]`
  const contentName = 'blog.contents'
  const { isSaveDisabled } = useAppSelector(selectBehaviours)
  const existing = content.blogContentId !== null && content.blogContentId !== undefined
  const [isReadOnly, setIsReadOnly] = useState<boolean>(existing)
  const { t } = useTranslation(['blogs'])
  const api = useApi()
  const {
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext()
  const contents = useWatch({ name: contentName })
  const blogImage = useWatch({ name: `${pathName}.blogContentImage` })
  const errorCont = get(errors, `${contentName}.message`) as unknown as string | null
  const errorObj = get(errors, `${pathName}.paragraphs`)
  const errorParag = errorObj && errorObj.message ? (errorObj.message as string) : null

  const handleRemoveContentByIndex = () => {
    setValue(
      contentName,
      contents.filter((_: IBlogContentEdit, ind: number) => index !== ind),
    )
  }

  const handleDelete = useCallback(async () => {
    try {
      if (existing) {
        await api.delete(BlogApis.deleteBlogContent(content.blogContentId))
      }

      handleRemoveContentByIndex()
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [contents])

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.edit'),
          onClick: () => {
            setIsReadOnly(false)
          },
        },
        textColor: 'black',
      },

      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: handleDelete,
        },
        textColor: 'red',
      },
    ]

    if (content.type.value === BlogContentTypeEnum.TITLE) {
      return []
    } else if (isReadOnly) {
      return options
    } else {
      return []
    }
  }

  const handleAddText = useCallback(() => {
    setValue(`${pathName}.paragraphs`, [
      ...content.paragraphs,
      { text: '', order: `${content.paragraphs.length + 1}`, isBold: { id: '0', name: '', value: '', checked: false } },
    ])
  }, [content])

  const handleCancel = useCallback(() => {
    if (!existing) {
      handleRemoveContentByIndex()
    }

    setIsReadOnly(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCreateContent = useCallback(async () => {
    const body = {
      content: {
        ...(existing ? { blogContentId: content.blogContentId } : {}),
        paragraphs: content.paragraphs.map((par) => ({
          ...(par.blogTextId ? { blogTextId: par.blogTextId } : {}),
          text: par.text,
          isBold: par.isBold.checked,
          order: Number(par.order),
        })),
        order: Number(content.order),
        type: content.type.value,
      },
    }

    try {
      const { data } = await api.patch<IBlog>(BlogApis.patchBlog(blogId), body)

      if (content.type.value === BlogContentTypeEnum.TEXT_LEFT || content.type.value === BlogContentTypeEnum.TEXT_RIGHT) {
        if (blogImage?.fileId !== null && blogImage?.fileId !== undefined) {
          const blogImageData: ICreateFile = {
            height: blogImage.height,
            publicId: blogImage.publicId,
            type: FileTypeEnum.IMAGE,
            url: blogImage.url,
            fileExtension: blogImage.fileExtension,
            width: blogImage.width,
          }

          if (existing) {
            await api.post(FileApis.uploadFilesByBlogContentId(content.blogContentId), blogImageData)
          } else {
            const contentIdThatIsExisting: number[] = contents.map((singleCont: IBlogContentEdit) => singleCont.blogContentId)
            const newContent = data.contents.find((cont) => !contentIdThatIsExisting.includes(cont.blogContentId!))

            if (newContent?.blogContentId) await api.post(FileApis.uploadFilesByBlogContentId(newContent.blogContentId), blogImageData)
          }
        }
      }

      setIsReadOnly(true)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [content, existing, blogImage, contents])

  const checkValidation = useCallback(async () => {
    const isValid = await trigger()

    if (isValid) {
      handleCreateContent()
    }
  }, [handleCreateContent])

  const checkIfTypeIsTitle = () => {
    if (content.type.value === BlogContentTypeEnum.TITLE) return true

    return isReadOnly
  }

  const isTypeIsTitle = checkIfTypeIsTitle()

  return (
    <DataSection
      tooltip={t('blogs:blog-content.tooltip')}
      title={t('blogs:blog-content.title')}
      subtitle={t('blogs:blog-content.subtitle')}
      dropdownOptions={checkOptions()}
    >
      <div className="relative grid grid-cols-3 gap-x-6 gap-y-4">
        {isReadOnly && <div className="absolute -top-3 -left-3 -right-3 -bottom-3 bg-light-grey-transparent z-2 opacity-50 cursor-not-allowed" />}
        <SingleSelect
          name={`${pathName}.type`}
          options={mapBlogContentTypeToSelectOptions(true)}
          label={t('blogs:add.fields.type')}
          placeholder={t('blogs:add.fields.typePlh')}
          isDisabled={isTypeIsTitle}
        />
        <div />
        <InputText isRequired name={`${pathName}.order`} label={t('blogs:add.fields.order')} placeholder={t('blogs:add.fields.orderPlh')} />
        {content.type.value !== BlogContentTypeEnum.TITLE && content.type.value !== BlogContentTypeEnum.TEXT_CENTER && (
          <div className="col-span-3">
            <InputFile
              isDisabled={isReadOnly}
              name={`${pathName}.blogContentImage`}
              label={t('blogs:add.fields.imagePlh')}
              placeholderGreen={t('certificate:files.fields.greenPlh')}
              placeholderGrey={t('certificate:files.fields.greyPlh')}
            />
          </div>
        )}
        {content.paragraphs.map((parag, i) => {
          return (
            <Fragment key={i}>
              <BlogText
                isTitle={content.type.value === BlogContentTypeEnum.TITLE}
                text={parag}
                contentIndex={index}
                isReadOnly={isReadOnly}
                paragraphIndex={i}
              />
              <ErrorMessage name={errorParag} variant="input" />
            </Fragment>
          )
        })}

        {errorCont && (
          <div className="col-span-3">
            <ErrorMessage name={errorCont} variant="input" />
          </div>
        )}

        {!isTypeIsTitle && (
          <div className="col-span-3 flex justify-between">
            <MainButton text={t('blogs:add.text')} variant="outlined" size="medium" htmlType="button" onClick={handleAddText} />

            <div className="flex gap-4">
              <MainButton text={t('g:button.cancel')} variant="alternative" size="medium" htmlType="button" onClick={handleCancel} />
              <MainButton
                text={t('g:button.submit')}
                variant="contained"
                size="medium"
                htmlType="button"
                disabled={!!isSaveDisabled.length}
                onClick={checkValidation}
              />
            </div>
          </div>
        )}
      </div>
    </DataSection>
  )
}

export default BlogContentDetails
