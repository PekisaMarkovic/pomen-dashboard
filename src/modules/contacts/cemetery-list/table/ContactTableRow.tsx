import { useTranslation } from 'react-i18next'
import ContactApis from '@/src/api/contacts'
import customToast from '@/src/components/core/toast/CustomToast'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ContactStatusEnum } from '@/src/enum/contact'
import { useApi } from '@/src/hooks/use-api'
import { IContact } from '@/src/interfaces/contacts'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { updateContactStatus } from '@/src/state/shared/contacts'
import ContactTableStatus from './ContactTableStatus'

type Props = {
  contact: IContact
}

const ContactTableRow = ({ contact }: Props) => {
  const { t } = useTranslation('contact')
  const api = useApi()
  const dispatch = useAppDispatch()

  const { message, email, name, status, contactId } = contact

  const handleUpdateStatus = async (status: ContactStatusEnum) => {
    try {
      await api.patch(ContactApis.patchContactStatus(contact.contactId), { status })
      dispatch(updateContactStatus({ contactId, status }))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  const checkOptions = () => {
    const enumOptions = Object.values(ContactStatusEnum).filter((status) => status !== ContactStatusEnum.NEW_MESSAGE)
    const options: CustomDropdown[] = enumOptions.map((status) => ({
      content: {
        type: 'button',
        text: t(`contact:contact-status.${status}`),
        onClick: () => {
          handleUpdateStatus(status)
        },
      },
    }))

    return options
  }

  return (
    <DefaultTableRowContainer cols={7} dropdownOptions={checkOptions()}>
      <div className="flex gap-x-2 py-3">
        <Paragraph text={name} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 flex">
        <Paragraph text={email} size="sm" color="black" noWrap />
      </div>

      <div className="py-3">
        <ContactTableStatus status={status} />
      </div>

      <div className="col-span-3 gap-x-2 py-3">
        <Paragraph text={message} size="sm" color="black" noWrap />
      </div>
    </DefaultTableRowContainer>
  )
}

export default ContactTableRow
