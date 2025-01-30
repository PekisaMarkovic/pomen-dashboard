import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import TributesApis from '@/src/api/tributes'
import customToast from '@/src/components/core/toast/CustomToast'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { ModalEnums } from '@/src/enum/modal'
import { TributeStatusEnum } from '@/src/enum/tribute'
import { useApi } from '@/src/hooks/use-api'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { ITribute } from '@/src/interfaces/tributes'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setModal } from '@/src/state/shared/modal'
import { setToEditTribute, updateTribute } from '@/src/state/shared/tributes'
import TributeTableStatus from './TributeTableStatus'

type Props = {
  tribute: ITribute
}

const TributeTableRow = ({ tribute }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { description, firstName, lastName, certificate, status, email } = tribute
  const dispatch = useAppDispatch()
  const api = useApi()

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
    <DefaultTableRowContainer dropdownOptions={checkOptions()}>
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
    </DefaultTableRowContainer>
  )
}

export default TributeTableRow
