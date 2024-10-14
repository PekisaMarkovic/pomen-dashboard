import get from 'lodash.get'
import { ChangeEvent, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useApi } from '../../../hooks/use-api'
import InputIcon from '../../../icons/input'
import { Spacing } from '../../../interfaces/general'
import { onMultyFileInput } from '../../../utils/images'
import ErrorMessage from '../typography/ErrorMessage'
import { style } from './InputFileStyle'
import customToast from '../toast/CustomToast'
import { IImage } from '../../../interfaces/image'
import GeneralIcons from '../../../icons/general'

type Props = {
  placeholderGreen?: string
  placeholderGrey?: string
  label?: string
  isRequired?: boolean
  name: string
  mt?: Spacing
  mb?: Spacing
}

const MultyImageInputFile = ({ label, placeholderGreen, placeholderGrey, isRequired, name, mb, mt }: Props) => {
  let marginTop = ''
  let marginBottom = ''

  if (mt) {
    marginTop = `mt-${mt}`
  }
  if (mb) {
    marginBottom = `mt-${mb}`
  }
  const removeName = `${name}IdsToRemove`
  const api = useApi()
  const { t } = useTranslation(['g'])
  const hidden = useRef<HTMLInputElement | null>(null)
  const files = (useWatch({ name }) as IImage[]) || []
  const removeIds = (useWatch({ name: removeName }) as string[]) || []
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      if (acceptedFiles.length === 0) return

      const { data } = await onMultyFileInput(api, acceptedFiles)

      setValue(name, [...files, ...data])
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  })

  const handleOnClickRemoveImage = (index: number, imageId?: number) => {
    setValue(
      name,
      files.filter((_: IImage, ind: number) => ind !== index),
    )

    if (imageId) {
      setValue(removeName, [...new Set([...removeIds, `${imageId}`])])
    }
  }

  const errorObj = get(errors, name)

  const error = errorObj && errorObj.message ? (errorObj.message as string) : null

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return

      const { data } = await onMultyFileInput(api, Array.from(e.target.files))

      setValue(name, [...files, ...data])
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <div>
      <div className={`flex flex-col ${marginTop} ${marginBottom}`} {...getRootProps()}>
        {label && (
          <label htmlFor={name} className="font-poppins text-black text-xs px-1 mb-2.5">
            {label}
            {isRequired && <span className="text-red">*</span>}
          </label>
        )}

        <div className={style()}>
          <div className="flex flex-col items-center justify-center" style={{ height: '90px' }}>
            <InputIcon type="File" />
            <p className="text-xs">
              <span className="font-poppins text-green">{placeholderGreen}</span> <span className="font-poppins text-grey">{placeholderGrey}</span>
            </p>
          </div>
        </div>

        <ErrorMessage name={error} variant="upload" />

        <input
          {...register(name)}
          ref={hidden}
          autoComplete="off"
          className="hidden h-0 w-0"
          type="file"
          onChange={handleInput}
          {...getInputProps()}
          multiple
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-2">
        {files.map(({ url, imageId }, index: number) => (
          <div key={index} className="h-20 w-40 overflow-hidden rounded-sm relative">
            <img
              src={url}
              alt={`${name} ${placeholderGreen} ${placeholderGrey} ${index}`}
              key={index}
              height={80}
              width={140}
              style={{ height: '80px', width: '140px', objectFit: 'fill' }}
            />
            <GeneralIcons
              type="TrashWhite"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => handleOnClickRemoveImage(index, imageId)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultyImageInputFile
