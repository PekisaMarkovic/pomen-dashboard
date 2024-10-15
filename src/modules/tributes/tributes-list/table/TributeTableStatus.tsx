import { useTranslation } from 'react-i18next'
import { TributeStatusEnum } from '../../../../enum/tribute'

interface OrderTableStatusProps {
  status: TributeStatusEnum
}

const TributeTableStatus = ({ status }: OrderTableStatusProps) => {
  const { t } = useTranslation(['tribute'])

  const text = t(`tribute:tribute-status.${status}`)

  switch (status) {
    case TributeStatusEnum.PENDING:
      return (
        <p className="font-poppins bg-light-grey-transparent border-1 border-solid border-lighy-grey flex items-center justify-center rounded-xs text-dark-grey text-sm h-7 px-2">
          {text}
        </p>
      )

    case TributeStatusEnum.ALLOWED:
      return (
        <p className="font-poppins bg-green-transparent border-1 border-solid border-green flex items-center justify-center rounded-xs text-green text-sm h-7 px-2">
          {text}
        </p>
      )

    case TributeStatusEnum.DENIED:
      return (
        <p className="font-poppins bg-orange-transparent border-1 border-solid border-orange flex items-center justify-center rounded-xs text-orange text-sm h-7 px-2">
          {text}
        </p>
      )

    default:
      return (
        <p className="font-poppins bg-light-grey-transparent border-1 border-solid border-lighy-grey flex items-center justify-center rounded-xs text-dark-grey text-sm h-7 px-2">
          {text}
        </p>
      )
  }
}

export default TributeTableStatus
