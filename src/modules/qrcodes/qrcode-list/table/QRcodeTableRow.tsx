import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Paragraph from '../../../../components/core/typography/Paragraph'
import DefaultTableRowContainer from '../../../../components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import { ModalEnums } from '../../../../enum/modal'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { IQRcode } from '../../../../interfaces/qrcode'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setModal } from '../../../../state/shared/modal'
import { setToEditQRcode } from '../../../../state/shared/qrcodes'
import { formatDateYearMonthDay } from '../../../../utils/date'

type Props = {
  qrcode: IQRcode
}

const QRcodeTableRow = ({ qrcode }: Props) => {
  const { t } = useTranslation(['g:button'])
  const dispatch = useAppDispatch()

  const { value, createdAt, certificate } = qrcode

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
    <DefaultTableRowContainer dropdownOptions={checkOptions()}>
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
    </DefaultTableRowContainer>
  )
}

export default QRcodeTableRow
