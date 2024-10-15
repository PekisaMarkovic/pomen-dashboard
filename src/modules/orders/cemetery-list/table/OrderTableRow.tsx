import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import OrdersApis from '../../../../api/orders'
import customToast from '../../../../components/core/toast/CustomToast'
import Paragraph from '../../../../components/core/typography/Paragraph'
import DefaultTableRowContainer from '../../../../components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import { OrderStatusEnum } from '../../../../enum/order'
import { useApi } from '../../../../hooks/use-api'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IOrder } from '../../../../interfaces/orders'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { updateOrderStatus } from '../../../../state/shared/orders'
import { formatDateYearMonthDay } from '../../../../utils/date'
import OrderTableStatus from './OrderTableStatus'

type Props = {
  order: IOrder
}

const OrderTableRow = ({ order }: Props) => {
  const { t } = useTranslation(['g', 'order'])
  const dispatch = useAppDispatch()
  const api = useApi()
  const { address, city, createdAt, status, firstName, lastName, phoneNumber, certificate, orderId } = order

  const handleUpdateOrderStatus = async (status: OrderStatusEnum) => {
    try {
      await api.patch(OrdersApis.patchOrderStatus(order.orderId), { status })
      dispatch(updateOrderStatus({ orderId, status }))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('order:order-status.delivered'),
          onClick: () => {
            handleUpdateOrderStatus(OrderStatusEnum.DELIVERED)
          },
        },
        textColor: 'green',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.in.progress'),
          onClick: () => {
            handleUpdateOrderStatus(OrderStatusEnum.IN_PROGRESS)
          },
        },
        textColor: 'orange',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.returned'),
          onClick: () => {
            handleUpdateOrderStatus(OrderStatusEnum.RETURNED)
          },
        },
        textColor: 'red',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.failed'),
          onClick: () => {
            handleUpdateOrderStatus(OrderStatusEnum.FAILED)
          },
        },
        textColor: 'red',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.canceled'),
          onClick: () => {
            handleUpdateOrderStatus(OrderStatusEnum.CANCELED)
          },
        },
        textColor: 'red',
      },
    ]
    return options
  }

  return (
    <DefaultTableRowContainer dropdownOptions={checkOptions()}>
      <div className="col-span-3 flex gap-x-2 py-3">
        <Paragraph text={`${firstName} ${lastName}, ${phoneNumber}`} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-3 flex gap-x-2 py-3">
        <Paragraph text={`${address}, ${city?.code}, ${city?.name}`} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2">
        <Link to={`${ROUTE_NAMES.certificates}/${certificate?.certificateId}`} className="flex gap-x-3 py-4 items-center truncate">
          <Paragraph text={certificate?.slug || ''} size="sm" color="black" noWrap />
        </Link>
      </div>

      <div className="py-3">
        <OrderTableStatus status={status} />
      </div>

      <div className="flex">
        <Paragraph text={formatDateYearMonthDay(createdAt)} size="sm" color="black" noWrap />
      </div>
    </DefaultTableRowContainer>
  )
}

export default OrderTableRow
