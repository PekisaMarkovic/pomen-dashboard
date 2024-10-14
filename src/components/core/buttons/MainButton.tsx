import { ReactNode } from 'react'
import { style } from './style'
import { FontFamily } from '../../../interfaces/general'

export type Variant = 'contained' | 'outlined' | 'text' | 'alternative' | 'primary' | 'error'

export type Size = 'extra-small' | 'small' | 'medium' | 'large' | 'full'

type Props = {
  className?: string
  text: string
  fontFamily?: FontFamily
  size: Size
  variant: Variant
  htmlType?: 'button' | 'submit' | 'reset'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
}

const MainButton = ({
  className = '',
  text,
  fontFamily = 'popins',
  onClick,
  htmlType = 'button',
  size,
  variant,
  leftIcon,
  rightIcon,
  disabled = false,
}: Props) => {
  return (
    <button onClick={onClick} type={htmlType} className={`${style({ fontFamily, size, variant, disabled })} ${className}`} disabled={disabled}>
      {leftIcon}
      {text}
      {rightIcon}
    </button>
  )
}

export default MainButton
