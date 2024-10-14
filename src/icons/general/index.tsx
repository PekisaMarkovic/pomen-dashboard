import ArrowBackIcon from './ArrowBackIcon'
import ArrowDownIcon from './ArrowDownIcon'
import ArrowRightIcon from './ArrowRightIcon'
import ArrowSelectIcon from './ArrowSelectIcon'
import CheckIcon from './CheckIcon'
import MoreIcon from './MoreIcon'
import SelectDropdownIcon from './SelectDropdownIcon'
import TooltipIcon from './TooltipIcon'
import TrashWhiteIcon from './TrashWhiteIcon'
import UnCheckIcon from './UnCheckIcon'
import UserPlaceholderIcon from './UserPlaceholderIcon'

interface Props extends React.SVGProps<SVGSVGElement> {
  type:
    | 'ArrowBack'
    | 'ArrowDown'
    | 'ArrowRight'
    | 'MoreIcon'
    | 'ArrowSelect'
    | 'Check'
    | 'UnCheck'
    | 'Tooltip'
    | 'TrashWhite'
    | 'SelectDropdown'
    | 'UserPlaceholder'
  onClick?: () => void
}

const GeneralIcons = ({ onClick, type, ...rest }: Props) => {
  switch (type) {
    case 'ArrowBack':
      return <ArrowBackIcon {...rest} onClick={onClick} />
    case 'ArrowDown':
      return <ArrowDownIcon {...rest} onClick={onClick} />
    case 'ArrowRight':
      return <ArrowRightIcon {...rest} onClick={onClick} />
    case 'MoreIcon':
      return <MoreIcon {...rest} onClick={onClick} />
    case 'ArrowSelect':
      return <ArrowSelectIcon {...rest} onClick={onClick} />
    case 'Check':
      return <CheckIcon {...rest} onClick={onClick} />
    case 'UnCheck':
      return <UnCheckIcon {...rest} onClick={onClick} />
    case 'Tooltip':
      return <TooltipIcon {...rest} onClick={onClick} />
    case 'TrashWhite':
      return <TrashWhiteIcon {...rest} onClick={onClick} />
    case 'SelectDropdown':
      return <SelectDropdownIcon {...rest} onClick={onClick} />

    case 'UserPlaceholder':
      return <UserPlaceholderIcon {...rest} onClick={onClick} />

    default:
      return null
  }
}

export default GeneralIcons
