import { useTranslation } from 'react-i18next'
import { ContactStatusEnum } from '@/src/enum/contact'

interface ContactTableStatusProps {
  status: ContactStatusEnum
}

const ContactTableStatus = ({ status }: ContactTableStatusProps) => {
  const { t } = useTranslation(['contact'])

  const text = t(`contact:contact-status.${status}`)

  switch (status) {
    case ContactStatusEnum.NEW_MESSAGE:
    case ContactStatusEnum.ARCHIVED:
      return (
        <p className="font-poppins bg-light-grey-transparent border-1 border-solid border-lighy-grey flex items-center justify-center rounded-xs text-dark-grey text-sm h-7 px-2">
          {text}
        </p>
      )

    case ContactStatusEnum.REPLIED:
    case ContactStatusEnum.RESLOVED:
      return (
        <p className="font-poppins bg-green-transparent border-1 border-solid border-green flex items-center justify-center rounded-xs text-green text-sm h-7 px-2">
          {text}
        </p>
      )

    case ContactStatusEnum.IN_PROGRESS:
      return (
        <p className="font-poppins bg-orange-transparent border-1 border-solid border-orange flex items-center justify-center rounded-xs text-orange text-sm h-7 px-2">
          {text}
        </p>
      )

    case ContactStatusEnum.SPAM:
    case ContactStatusEnum.ESCALATED:
      return (
        <p className="font-poppins bg-red-transparent border-1 border-solid border-red-dark flex items-center justify-center rounded-xs text-red-dark text-sm h-7 px-2">
          {text}
        </p>
      )

    default:
      return (
        <p className="font-poppins bg-light-grey-transparent border-1 border-solid border-lighy-grey flex items-center justify-center rounded-xs text-dark-grey text-sm h-7 px-2">
          {text}
        </p>
      )
  }
}

export default ContactTableStatus
