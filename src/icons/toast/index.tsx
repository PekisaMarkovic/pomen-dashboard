import ErrorIcon from './ErrorIcon'
import QuestionIcon from './QuestionIcon'
import SuccessIcon from './SuccessIcon'
import WarrningIcon from './WarrningIcon'

interface Props extends React.SVGProps<SVGSVGElement> {
  type: 'Error' | 'Success' | 'Question' | 'Warrning'
}

const ToastIcon = ({ type, ...rest }: Props) => {
  switch (type) {
    case 'Error':
      return <ErrorIcon {...rest} />
    case 'Success':
      return <SuccessIcon {...rest} />
    case 'Question':
      return <QuestionIcon {...rest} />
    case 'Warrning':
      return <WarrningIcon {...rest} />

    default:
      return null
  }
}

export default ToastIcon
