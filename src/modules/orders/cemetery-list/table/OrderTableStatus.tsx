import { useTranslation } from 'react-i18next'
import { OrderStatusEnum } from '../../../../enum/order'

interface OrderTableStatusProps {
  status: OrderStatusEnum
}

const OrderTableStatus = ({ status }: OrderTableStatusProps) => {
  const { t } = useTranslation(['order'])

  const text = t(`order:order-status.${status}`)

  switch (status) {
    case OrderStatusEnum.PENDING:
      return (
        <p className="font-poppins bg-light-grey-transparent border-1 border-solid border-lighy-grey flex items-center justify-center rounded-xs text-dark-grey text-sm h-7 px-2">
          {text}
        </p>
      )

    case OrderStatusEnum.DELIVERED:
      return (
        <p className="font-poppins bg-green-transparent border-1 border-solid border-green flex items-center justify-center rounded-xs text-green text-sm h-7 px-2">
          {text}
        </p>
      )

    case OrderStatusEnum.IN_PROGRESS:
      return (
        <p className="font-poppins bg-orange-transparent border-1 border-solid border-orange flex items-center justify-center rounded-xs text-orange text-sm h-7 px-2">
          {text}
        </p>
      )

    case OrderStatusEnum.CANCELED:
    case OrderStatusEnum.RETURNED:
    case OrderStatusEnum.FAILED:
      return (
        <p className="font-poppins bg-red-transparent border-1 border-solid border-red-dark flex items-center justify-center rounded-xs text-red-dark text-sm h-7 px-2">
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

export default OrderTableStatus
