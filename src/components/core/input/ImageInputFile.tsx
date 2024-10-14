import get from 'lodash.get'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useApi } from '../../../hooks/use-api'
import InputIcon from '../../../icons/input'
import { Spacing } from '../../../interfaces/general'
import { onSingleFileInput } from '../../../utils/images'
import ErrorMessage from '../typography/ErrorMessage'
import { style } from './InputFileStyle'
import customToast from '../toast/CustomToast'
import { IImage } from '../../../interfaces/image'

type Props = {
  placeholderGreen?: string
  placeholderGrey?: string
  label?: string
  isRequired?: boolean
  name: string
  mt?: Spacing
  mb?: Spacing
}

const ImageInputFile = ({ label, placeholderGreen, placeholderGrey, isRequired, name, mb, mt }: Props) => {
  let marginTop = ''
  let marginBottom = ''

  if (mt) {
    marginTop = `mt-${mt}`
  }
  if (mb) {
    marginBottom = `mt-${mb}`
  }
  const api = useApi()
  const { t } = useTranslation(['g'])
  const hidden = useRef<HTMLInputElement | null>(null)
  const file = useWatch({ name }) as IImage
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()
  const [showOverlay, setShowOverlay] = useState<boolean>(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      if (acceptedFiles.length === 0) return

      const { data } = await onSingleFileInput(api, acceptedFiles[0])

      setValue(name, data)
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

  const errorObj = get(errors, name)

  const error = errorObj && errorObj.message ? (errorObj.message as string) : null

  const handleOnMouseEnter = () => setShowOverlay(true)
  const handleOnMouseLeave = () => setShowOverlay(false)

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return

      const { data } = await onSingleFileInput(api, e.target.files[0])

      setValue(name, data)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <>
      <div
        className={`flex flex-col ${marginTop} ${marginBottom}`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        {...getRootProps()}
      >
        {label && (
          <label htmlFor={name} className="font-poppins text-black text-xs px-1 mb-2.5">
            {label}
            {isRequired && <span className="text-red">*</span>}
          </label>
        )}

        <div className={style()}>
          {file ? (
            <>
              <img
                src={file.url}
                alt={`${name} ${placeholderGreen} ${placeholderGrey}`}
                width={80}
                height={140}
                style={{ objectFit: 'fill', height: '90px', width: '90px' }}
              />
              {showOverlay && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center gap-x-1 rounded-xs opacity-80">
                  <InputIcon type="Replace" />
                  <p className="text-white text-xs">{t(`g:replace`)}</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ height: '90px' }}>
              <InputIcon type="File" />
              <p className="text-xs">
                <span className="font-poppins text-green">{placeholderGreen}</span> <span className="font-poppins text-grey">{placeholderGrey}</span>
              </p>
            </div>
          )}
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
          multiple={false}
        />
      </div>
    </>
  )
}

export default ImageInputFile
