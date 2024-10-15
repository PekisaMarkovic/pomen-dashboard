import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext, useWatch } from 'react-hook-form'
import UploadIcon from '../../../../public/images/general/plus-upload.svg'
// import { onFileInput, onSingleFileInput } from '@/api/s3'
import ReplaceIcon from '../../../../public/images/general/replace.svg'
import Elipse from '../../../../public/images/case-study/client.png'
import get from 'lodash.get'
import ErrorMessage from '../typography/ErrorMessage'
import { useDropzone } from 'react-dropzone'
import { FileTypeEnum } from '../../../enum/file'

type Props = {
  maxSize: number
  supportedFormat: string
  name: string
  foldersPath: string
  type: 'ELIPSE'
  fileType?: FileTypeEnum
}

const InputFileCustomPlh = ({ maxSize, supportedFormat, name, type, fileType = FileTypeEnum.IMAGE }: Props) => {
  const { t } = useTranslation(['g'])
  const hidden = useRef<HTMLInputElement | null>(null)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const file = useWatch({ name })
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext()

  const errorObj = get(errors, name)
  const error = errorObj && errorObj.message ? (errorObj.message as string) : null

  const handleOnMouseEnter = () => setShowOverlay(true)

  const handleOnMouseLeave = () => setShowOverlay(false)

  const onDrop = useCallback(async () => {
    // const newFile = await onSingleFileInput(acceptedFiles[0], foldersPath)

    setValue(name, null)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    // const file = await onFileInput(e, foldersPath)

    setValue(name, file)
  }

  const handleOnClickActivateInput = () => {
    if (hidden?.current) {
      hidden.current.click()
    }
  }

  const checkType = () => {
    switch (type) {
      case 'ELIPSE':
        return Elipse

      default:
        return Elipse
    }
  }

  return (
    <div className="flex flex-col" {...getRootProps()}>
      <div className="flex gap-x-4">
        <div className="relative cursor-pointer" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
          <img
            src={file ? file.url : checkType()}
            height={80}
            width={140}
            style={{ height: '90px', width: '90px', objectFit: 'fill', borderRadius: '50%' }}
            alt="Astronaut"
          />
          {showOverlay && (
            <div
              className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center gap-x-1 rounded-full opacity-80"
              onClick={handleOnClickActivateInput}
            >
              <ReplaceIcon />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-poppins text-sm text-grey">{t('g:file.maxSize', { size: maxSize })}</span>
          <span className="font-poppins text-sm text-grey">{t('g:file.supportedFormat', { format: supportedFormat })}</span>
          <div className="flex gap-x-2 items-center cursor-pointer" onClick={handleOnClickActivateInput}>
            <UploadIcon />
            <span className="font-poppins text-sm text-green">{t('g:button.upload')}</span>
          </div>
        </div>
      </div>
      <ErrorMessage name={error} variant="select" />
      <input
        autoComplete="off"
        className="hidden h-0 w-0"
        {...register(name)}
        ref={hidden}
        type="file"
        accept={fileType === FileTypeEnum.VIDEO ? 'video/*' : 'image/*'}
        onChange={handleFile}
        {...getInputProps()}
        multiple={false}
      />
    </div>
  )
}

export default InputFileCustomPlh
