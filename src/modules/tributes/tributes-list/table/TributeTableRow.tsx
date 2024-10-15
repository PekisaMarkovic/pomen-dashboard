import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import { ModalEnums } from '../../../../enum/modal'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { ITribute } from '../../../../interfaces/tributes'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setModal } from '../../../../state/shared/modal'
import { setToEditTribute, updateTribute } from '../../../../state/shared/tributes'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import { Link } from 'react-router-dom'
import TributeTableStatus from './TributeTableStatus'
import { TributeStatusEnum } from '../../../../enum/tribute'
import { useApi } from '../../../../hooks/use-api'
import TributesApis from '../../../../api/tributes'
import customToast from '../../../../components/core/toast/CustomToast'

type Props = {
  tribute: ITribute
}

const TributeTableRow = ({ tribute }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const { description, firstName, lastName, certificate, status, email } = tribute
  const dispatch = useAppDispatch()
  const api = useApi()

  const handleOnClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const handleUpdateTributeStatus = async (status: TributeStatusEnum) => {
    try {
      await api.patch(TributesApis.patchTributeStatus(tribute.tributeId), { status })
      dispatch(updateTribute({ ...tribute, status }))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.edit'),
          onClick: () => {
            dispatch(setToEditTribute(tribute))
            dispatch(setModal(ModalEnums.EDIT_TRIBUTE))
          },
        },
      },

      {
        content: {
          type: 'button',
          text: t(`tribute:tribute-status.${TributeStatusEnum.ALLOWED}`),
          onClick: () => {
            handleUpdateTributeStatus(TributeStatusEnum.ALLOWED)
          },
        },
        textColor: 'green',
      },

      {
        content: {
          type: 'button',
          text: t(`tribute:tribute-status.${TributeStatusEnum.DENIED}`),
          onClick: () => {
            handleUpdateTributeStatus(TributeStatusEnum.DENIED)
          },
        },
        textColor: 'orange',
      },

      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: () => {
            console.log('TODO')
          },
        },
        textColor: 'red',
      },
    ]
    return options
  }

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-9 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`} onClick={() => {}}>
      <div className="col-span-3 gap-x-3 py-4">
        <Paragraph text={description} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 py-4">
        <Paragraph text={`${firstName} ${lastName}`} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={email} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 gap-x-2">
        <Link
          to={`${ROUTE_NAMES.certificates}/${certificate?.certificateId}${ROUTE_NAMES.tributes}`}
          className="flex gap-x-3 py-4 items-center truncate"
        >
          <Paragraph text={certificate?.slug || ''} size="sm" color="black" noWrap />
        </Link>
      </div>

      <div className="flex py-3">
        <TributeTableStatus status={status} />
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

export default TributeTableRow
