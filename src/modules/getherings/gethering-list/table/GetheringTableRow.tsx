import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import { ModalEnums } from '../../../../enum/modal'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IGethering } from '../../../../interfaces/getherings'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setToEditGethering } from '../../../../state/shared/getherings'
import { setModal } from '../../../../state/shared/modal'
import { formatDateYearMonthDay } from '../../../../utils/date'
import { Link } from 'react-router-dom'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'

type Props = {
  gethering: IGethering
}

const GetheringTableRow = ({ gethering }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const { address, certificate, getheringDate, hour } = gethering
  const dispatch = useAppDispatch()

  const handleOnClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: () => {},
        },
        textColor: 'red',
      },
      {
        content: {
          type: 'button',
          text: t('g:button.edit'),
          onClick: () => {
            dispatch(setToEditGethering(gethering))
            dispatch(setModal(ModalEnums.EDIT_GETHERING))
          },
        },
      },
    ]
    return options
  }

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-7 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`} onClick={() => {}}>
      <div className="gap-x-3 py-3">
        <Paragraph text={formatDateYearMonthDay(getheringDate)} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={`${hour}`} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-3 gap-x-2 py-3">
        <Paragraph text={address} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 gap-x-2">
        <Link
          to={`${ROUTE_NAMES.certificates}/${certificate?.certificateId}${ROUTE_NAMES.getherings}`}
          className="flex gap-x-3 py-4 items-center truncate"
        >
          <Paragraph text={certificate?.slug || ''} size="sm" color="black" noWrap />
        </Link>
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

export default GetheringTableRow
