import Label from '../../../components/core/typography/Label'
import { useFormContext } from 'react-hook-form'
import ErrorMessage, { Variant } from '../../../components/core/typography/ErrorMessage'
import get from 'lodash.get'
import { ChangeEventHandler } from 'react'
import { Spacing } from '../../../interfaces/general'

type Varaint = 'default' | 'simple'

type Props = {
  typeHtml?: 'text' | 'password'
  placeholder?: string
  label?: string
  labelTooltip?: string
  isRequired?: boolean
  name: string
  initValue?: string
  variant?: Varaint
  disabled?: boolean
  textCenter?: boolean
  mt?: Spacing
  mb?: Spacing
  errorMessageType?: Variant
}

const InputText = ({
  label,
  typeHtml = 'text',
  placeholder,
  isRequired,
  name,
  initValue,
  variant = 'default',
  disabled,
  textCenter,
  mb,
  mt,
  errorMessageType = 'input',
}: Props) => {
  let marginTop = ''
  let marginBottom = ''

  if (mt) {
    marginTop = `mt-${mt}`
  }
  if (mb) {
    marginBottom = `mt-${mb}`
  }
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext()

  const errorObj = get(errors, name)

  const error = errorObj && errorObj.message ? (errorObj.message as string) : null

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled) return
    setValue(name, e.target.value)
    clearErrors(name)
  }

  const style = () => {
    switch (variant) {
      case 'simple':
        return `font-poppins bg-white border-none ${
          textCenter ? 'text-center' : ''
        } text-sm text-black placeholder:text-text-grey focus:ring-green focus:border-green focus:outline-none focus-visible:ring-green block ${
          disabled ? 'cursor-not-allowed' : ''
        }`

      default:
        return `font-poppins bg-white border-1 ${
          error ? 'border-red border-solid' : 'border-grey border-solid'
        } text-sm text-black placeholder:text-text-grey py-3.5 px-4 focus:ring-green focus:border-green focus:outline-none focus-visible:ring-green block w-full rounded-xs-plus ${
          disabled ? 'cursor-not-allowed' : ''
        }`
    }
  }

  return (
    <div className={`flex flex-col relative ${marginTop} ${marginBottom}`}>
      {variant === 'default' && label && <Label htmlFor={name} label={label} isRequired={isRequired} />}

      <input
        autoComplete="off"
        {...register(name, { value: initValue || '' })}
        type={typeHtml}
        placeholder={placeholder}
        className={style()}
        disabled={disabled}
        onChange={handleInputChange}
      />

      <ErrorMessage name={error} variant={errorMessageType} />
    </div>
  )
}

export default InputText
