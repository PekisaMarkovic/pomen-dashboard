import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IQRcode } from '../../../../interfaces/qrcode'
import { formatDateYearMonthDay } from '../../../../utils/date'
import QRcodeTableImage from './QRcodeTableImage'
import { Link } from 'react-router-dom'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'

type Props = {
  qrcode: IQRcode
}

const QRcodeTableRow = ({ qrcode }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const [isShown, setIsShown] = useState<boolean>(false)

  const { value, createdAt, certificate } = qrcode

  const handleOnClick = () => setOpen(!open)

  const handleClose = () => setOpen(false)

  const handleIsShown = useCallback(() => {
    setIsShown(true)
  }, [])

  const handleIsHide = useCallback(() => {
    setIsShown(false)
  }, [])

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
    <div className={`relative pl-4 pr-6 grid grid-cols-6 border-b-1 border-b-light-grey-alt border-solid ${open || isShown ? 'z-4' : 'z-2'}`}>
      <div className="flex gap-x-2 py-3">
        <QRcodeTableImage
          isShown={isShown}
          url={value}
          alt={`${certificate?.firstName} ${certificate?.lastName} ${certificate?.slug}`}
          handleIsHide={handleIsHide}
          handleIsShown={handleIsShown}
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
