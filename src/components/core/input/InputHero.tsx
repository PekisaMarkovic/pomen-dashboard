// import { onFileInput, onSingleFileInput } from '@/api/s3'
import FileImageIcon from '@/public/images/general/file-image.svg'
import ReplaceIcon from '@/public/images/general/replace.svg'
import get from 'lodash.get'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ErrorMessage from '../typography/ErrorMessage'
import { useDropzone } from 'react-dropzone'
import { FileTypeEnum } from '../../../enum/file'

type Props = {
  placeholderGreen?: string
  placeholderGrey?: string
  label?: string
  isRequired?: boolean
  maxSize?: number
  supportedFormat?: string
  name: string
  foldersPath: string
  fileType?: FileTypeEnum
}

const InputHero = ({ label, placeholderGreen, placeholderGrey, isRequired, name, fileType = FileTypeEnum.IMAGE }: Props) => {
  const { t } = useTranslation(['g'])
  const hidden = useRef<HTMLInputElement | null>(null)
  const image = useWatch({ name })
  const [previewHero, setPreviewHero] = useState<string | null>(image?.url || null)
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const [showOverlay, setShowOverlay] = useState<boolean>(false)

  const errorObj = get(errors, name)

  const error = errorObj && errorObj.message ? (errorObj.message as string) : null

  const handleOnMouseEnter = () => setShowOverlay(true)
  const handleOnMouseLeave = () => setShowOverlay(false)

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setPreviewHero(URL.createObjectURL(e.target.files[0]))
    // const newFile = await onFileInput(e, foldersPath)

    // setValue(name, newFile)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setPreviewHero(URL.createObjectURL(acceptedFiles[0]))
    // const newFile = await onSingleFileInput(acceptedFiles[0], foldersPath)

    // setValue(name, newFile)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  })

  return (
    <div className="flex flex-col" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} {...getRootProps()}>
      <label htmlFor={name} className="font-poppins text-black text-xs px-1 mb-2.5">
        {label}
        {isRequired && <span className="text-red">*</span>}
      </label>

      <div
        className={`relative cursor-pointer bg-light-grey-transparent outline-grey rounded-xs-plus flex flex-col items-center gap-x-4 pb-4 pt-5 justify-center ${
          previewHero ? '' : 'outline-dashed outline-1 outline-offset-0'
        }`}
        style={{ height: '257px', width: '100%' }}
      >
        {previewHero ? (
          <>
            <img
              src={previewHero}
              alt={`${name} ${placeholderGreen} ${placeholderGrey}`}
              width={361}
              height={257}
              style={{ objectFit: 'fill', height: '257px', width: '100%' }}
            />
          </>
        ) : (
          <>
            <FileImageIcon />
            <p className="text-xs">
              <span className="font-poppins text-green">{placeholderGreen}</span> <span className="font-poppins text-grey">{placeholderGrey}</span>
            </p>
          </>
        )}
        {previewHero && showOverlay && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center gap-x-1 rounded-xs opacity-80">
            <ReplaceIcon />
            <p className="text-white text-xs">{t(`g:replace`)}</p>
          </div>
        )}
      </div>

      <ErrorMessage name={error} variant="upload" />

      <input
        autoComplete="off"
        {...register(name)}
        className="hidden h-0 w-0"
        type="file"
        accept={fileType === FileTypeEnum.VIDEO ? 'video/*' : 'image/*'}
        onChange={handleInput}
        {...getInputProps()}
        ref={hidden}
        multiple={false}
      />
    </div>
  )
}

export default InputHero
