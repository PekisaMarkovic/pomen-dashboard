import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IQRcode } from '../../../../interfaces/qrcode'
import { formatDateYearMonthDay } from '../../../../utils/date'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setModal } from '../../../../state/shared/modal'
import { setToEditQRcode } from '../../../../state/shared/qrcodes'
import { ModalEnums } from '../../../../enum/modal'

type Props = {
  qrcode: IQRcode
}

const QRcodeTableRow = ({ qrcode }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { value, createdAt, certificate } = qrcode

  const handleOnClick = () => setOpen(!open)

  const handleClose = () => setOpen(false)

  const handleOpenQRcodeModal = () => {
    dispatch(setToEditQRcode(qrcode))
    dispatch(setModal(ModalEnums.SHOW_QRCODE))
  }

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'link',
          text: t('g:button.download'),
          href: value,
          download: true,
          target: '_blank',
        },
        textColor: 'red',
      },
    ]
    return options
  }

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-6 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`}>
      <div className="flex gap-x-2 py-3">
        <img
          src={value}
          className="h-8 w-8 cursor-pointer"
          onClick={handleOpenQRcodeModal}
          alt={`${certificate?.firstName} ${certificate?.lastName} ${certificate?.slug}`}
        />
      </div>

      <div className="col-span-2 flex gap-x-2 py-3">
        <Paragraph text={`${certificate?.firstName} ${certificate?.lastName}`} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 flex gap-x-2 py-3">
        <Link to={`${ROUTE_NAMES.certificates}/${certificate?.certificateId}`} className="flex gap-x-3 items-center truncate">
          <Paragraph text={`${certificate?.slug}`} size="sm" color="black" noWrap />
        </Link>
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

export default QRcodeTableRow
