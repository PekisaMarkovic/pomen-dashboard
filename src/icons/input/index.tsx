import ReplaceIcon from './ReplaceIcon'
import SearchIcon from './SearchIcon'

interface Props extends React.SVGProps<SVGSVGElement> {
  type: 'Search' | 'Replace' | 'File'
  onClick?: () => void
}

const InputIcon = ({ type, onClick, ...rest }: Props) => {
  switch (type) {
    case 'Replace':
      return <ReplaceIcon {...rest} onClick={onClick} />
    case 'File':
      return <SearchIcon {...rest} onClick={onClick} />
    case 'Search':
      return <SearchIcon {...rest} onClick={onClick} />

    default:
      return null
  }
}

export default InputIcon
