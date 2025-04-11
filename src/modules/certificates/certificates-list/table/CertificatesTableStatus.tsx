import { useTranslation } from 'react-i18next'
import { CertificateStatusEnums } from '@/src/enum'

interface CertificatesTableStatusProps {
  status: CertificateStatusEnums
}

const CertificatesTableStatus = ({ status }: CertificatesTableStatusProps) => {
  const { t } = useTranslation(['certificate'])

  const text = t(`certificate:certificate-status.${status}`)

  switch (status) {
    case CertificateStatusEnums.PUBLISHED:
      return (
        <p className="font-poppins bg-light-blue-transparent border-1 border-solid border-blue flex items-center justify-center rounded-xs text-blue text-sm h-7 px-2">
          {text}
        </p>
      )

    case CertificateStatusEnums.COMPLATED:
      return (
        <p className="font-poppins bg-green-transparent border-1 border-solid border-green flex items-center justify-center rounded-xs text-green text-sm h-7 px-2">
          {text}
        </p>
      )

    case CertificateStatusEnums.DRAFT:
      return (
        <p className="font-poppins bg-orange-transparent border-1 border-solid border-orange flex items-center justify-center rounded-xs text-orange text-sm h-7 px-2">
          {text}
        </p>
      )

    case CertificateStatusEnums.SUSPENDED:
      return (
        <p className="font-poppins bg-red-transparent border-1 border-solid border-red-dark flex items-center justify-center rounded-xs text-red-dark text-sm h-7 px-2">
          {text}
        </p>
      )
  }
}

export default CertificatesTableStatus
