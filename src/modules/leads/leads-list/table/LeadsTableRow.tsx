import LeadsApis from '@/src/api/leads'
import customToast from '@/src/components/core/toast/CustomToast'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { useApi } from '@/src/hooks/use-api'
import { CustomDropdown, ILead } from '@/src/interfaces'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectLeads, setLeads, setToConvertLead, updateLeadsStatus } from '@/src/state/shared/leads'
import { formatDateYearMonthDay } from '@/src/utils/date'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LeadsTableStatus from '@/src/modules/leads/leads-list/table/LeadsTableStatus'
import { setModal } from '@/src/state/shared/modal'
import { LeadStatusEnums, ModalEnums } from '@/src/enum'

type Props = {
  lead: ILead
}

const LeadsTableRow = ({ lead }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { firstName, lastName, email, phoneNumber, address, status, createdAt, leadId } = lead
  const dispatch = useAppDispatch()
  const { leads } = useAppSelector(selectLeads)
  const api = useApi()

  const handleUpdateOrderStatus = async (status: LeadStatusEnums) => {
    try {
      await api.patch(LeadsApis.patchLeadStatus(leadId), { status })
      dispatch(updateLeadsStatus({ leadId, status }))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(LeadsApis.deleteLead(leadId))

      if (leads) {
        dispatch(setLeads({ ...leads, items: leads.items.filter((obj) => obj.leadId !== leadId) }))
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [leads, leadId])

  const checkOptions = () => {
    const statusOptions: CustomDropdown[] =
      lead.status === LeadStatusEnums.DISCARDED
        ? []
        : [
            {
              content: {
                type: 'button',
                text: t('leads:leads-status.discarded'),
                onClick: () => handleUpdateOrderStatus(LeadStatusEnums.DISCARDED),
              },
              textColor: 'red',
            },
          ]

    const options: CustomDropdown[] = [
      ...statusOptions,
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: handleDelete,
        },
        textColor: 'red',
      },
    ]
    return options
  }

  const handleOpenModal = useCallback(() => {
    dispatch(setModal(ModalEnums.CONVERT_LEAD))
    dispatch(setToConvertLead(lead))
    if (lead.status === LeadStatusEnums.NEW) {
      handleUpdateOrderStatus(LeadStatusEnums.IN_PROGRESS)
    }
  }, [])

  return (
    <DefaultTableRowContainer cols={7} dropdownOptions={checkOptions()}>
      <div className="cursor-pointer col-span-2  gap-x-3 py-3" onClick={handleOpenModal}>
        <Paragraph text={`${firstName} ${lastName}`} size="sm" color="black" noWrap />
      </div>
      <div className="cursor-pointer flex" onClick={handleOpenModal}>
        <Paragraph text={email} size="sm" color="black" noWrap />
      </div>

      <div className="cursor-pointer flex" onClick={handleOpenModal}>
        <Paragraph text={phoneNumber} size="sm" color="black" noWrap />
      </div>

      <div className="cursor-pointer flex" onClick={handleOpenModal}>
        <Paragraph text={address} size="sm" color="black" noWrap />
      </div>

      <div className="cursor-pointer py-3" onClick={handleOpenModal}>
        <LeadsTableStatus status={status} />
      </div>

      <div className="cursor-pointer flex" onClick={handleOpenModal}>
        <Paragraph text={`${formatDateYearMonthDay(createdAt)}`} size="sm" color="black" noWrap />
      </div>
    </DefaultTableRowContainer>
  )
}

export default LeadsTableRow
