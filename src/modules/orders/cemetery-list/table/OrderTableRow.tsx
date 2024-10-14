import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IOrder } from '../../../../interfaces/orders'
import { formatDateYearMonthDay } from '../../../../utils/date'
import OrderTableStatus from './OrderTableStatus'

type Props = {
  order: IOrder
}

const OrderTableRow = ({ order }: Props) => {
  const { t } = useTranslation(['g', 'order'])
  const [open, setOpen] = useState<boolean>(false)
  const { address, city, createdAt, status, firstName, lastName, phoneNumber, certificate } = order

  const handleOnClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('order:order-status.delivered'),
          onClick: () => {
            console.log(order)
          },
        },
        textColor: 'green',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.in.progress'),
          onClick: () => {
            console.log(order)
          },
        },
        textColor: 'orange',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.returned'),
          onClick: () => {
            console.log(order)
          },
        },
        textColor: 'red',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.failed'),
          onClick: () => {
            console.log(order)
          },
        },
        textColor: 'red',
      },

      {
        content: {
          type: 'button',
          text: t('order:order-status.canceled'),
          onClick: () => {
            console.log(order)
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

      <div className="col-span-2 py-3">
        <Paragraph text={certificate?.slug || ''} size="sm" color="black" noWrap />
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
