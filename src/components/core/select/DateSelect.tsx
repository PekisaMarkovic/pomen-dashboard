import { SyntheticEvent, useEffect, useState } from 'react'
import Label from '../typography/Label'
import { useFormContext, useWatch } from 'react-hook-form'
import ErrorMessage from '../typography/ErrorMessage'
import get from 'lodash.get'
import ReactDatePicker from 'react-datepicker'
import GeneralIcons from '../../../icons/general'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { handleAllowScroll, handleDisableScroll } from '../../../state/shared/behaviours'

type Props = {
  placeholder?: string
  label: string
  isRequired?: boolean
  name: string
  isDisabled?: boolean
  dateFormat?: string
}

const DateSelect = ({ label, placeholder, isRequired, name, isDisabled, dateFormat }: Props) => {
  const selected = useWatch({ name })
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const errorObj = get(errors, name)

  const error = errorObj && errorObj.message ? (errorObj.message as string) : null

  useEffect(() => {
    register(name)
  }, [])

  const handleOpen = () => {
    if (isDisabled) return
    setOpen(!open)
    dispatch(handleDisableScroll())
  }

  const handleClose = () => {
    setOpen(false)
    dispatch(handleAllowScroll())
  }

  const outlineStyle = () => {
    if (error) return 'border-red border-solid'
    if (open) return 'border-green border-solid'
    return 'border-grey border-solid'
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => {
    event?.stopPropagation()
    setValue(name, date)
    setOpen(false)
    dispatch(handleAllowScroll())
  }

  return (
    <div className="flex flex-col relative cursor-pointer" onClick={handleOpen} onMouseLeave={handleClose}>
      <Label htmlFor={name} label={label} isRequired={isRequired} />

      <div className={`flex items-center jusfity-between bg-white py-3 px-4 block w-full rounded-xs-plus border-1 ${outlineStyle()}`}>
        <ReactDatePicker selected={selected} placeholderText={placeholder} onChange={handleOnChange} open={open} dateFormat={dateFormat} />
        <GeneralIcons type="SelectDropdown" className={`${open ? 'rotate-180' : ''}`} />
      </div>

      <ErrorMessage name={error} variant="select" />
    </div>
  )
}

export default DateSelect
