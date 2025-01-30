import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { ModalEnums } from '@/src/enum/modal'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { IGethering } from '@/src/interfaces/getherings'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setToEditGethering } from '@/src/state/shared/getherings'
import { setModal } from '@/src/state/shared/modal'
import { formatDateYearMonthDay, formatTimeOption } from '@/src/utils/date'

type Props = {
  gethering: IGethering
}

const GetheringTableRow = ({ gethering }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { address, certificate, getheringDate, hour } = gethering
  const dispatch = useAppDispatch()

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
    <DefaultTableRowContainer cols={7} dropdownOptions={checkOptions()}>
      <div className="gap-x-3 py-3">
        <Paragraph text={formatDateYearMonthDay(getheringDate)} size="sm" color="black" noWrap />
      </div>
      <div className="flex">
        <Paragraph text={formatTimeOption(`${hour}`)} size="sm" color="black" noWrap />
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
    </DefaultTableRowContainer>
  )
}

export default GetheringTableRow
