import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IOrder } from '../../../../interfaces/orders'
import { formatDateYearMonthDay } from '../../../../utils/date'
import OrderTableStatus from './OrderTableStatus'
import customToast from '../../../../components/core/toast/CustomToast'
import { useApi } from '../../../../hooks/use-api'
import OrdersApis from '../../../../api/orders'
import { OrderStatusEnum } from '../../../../enum/order'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { updateOrderStatus } from '../../../../state/shared/orders'
import { Link } from 'react-router-dom'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'

type Props = {
  order: IOrder
}

const OrderTableRow = ({ order }: Props) => {
  const { t } = useTranslation(['g', 'order'])
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const api = useApi()
  const { address, city, createdAt, status, firstName, lastName, phoneNumber, certificate, orderId } = order

  const handleOnClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

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
    <div
      className={`relative pl-4 pr-6 grid grid-cols-10 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`}
      onClick={() => {}}
    >
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

      <div className={`absolute top-1/2 -translate-y-2/4 right-2 ${open ? 'z-4' : 'z-2'}`} onMouseLeave={handleClose}>
        <div className="relative">
          <GeneralIcons type="MoreIcon" className="cursor-pointer z-1" onClick={handleOnClick} />
          {open && <CustomDropdowns dropdownOptions={checkOptions()} />}
        </div>
      </div>
    </div>
  )
}

export default OrderTableRow
