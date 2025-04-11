import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import GeneralIcons from '@/src/icons/general'
import { ICertificate, CustomDropdown } from '@/src/interfaces'
import { formatDateYearMonthDay } from '@/src/utils/date'
import { useCallback } from 'react'
import { useApi } from '@/src/hooks/use-api'
import customToast from '@/src/components/core/toast/CustomToast'
import CertificatesApis from '@/src/api/certificates'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCertificates, setCertificates } from '@/src/state/shared/certificates'
import CertificatesTableStatus from '@/src/modules/certificates/certificates-list/table/CertificatesTableStatus'
import CertificatesTablePricingPackage from '@/src/modules/certificates/certificates-list/table/CertificatesTablePricingPackage'

type Props = {
  certificate: ICertificate
}

const CertificateTableRow = ({ certificate }: Props) => {
  const { t } = useTranslation(['g:button'])
  const api = useApi()
  const dispatch = useAppDispatch()
  const { certificates } = useAppSelector(selectCertificates)
  const { status, dateOfBirth, dateOfDeath, placeOfBirth, placeOfDeath, firstName, lastName, cemetery, location, profileImage, certificateId } =
    certificate
  const linkTo = `${ROUTE_NAMES.certificates}/${certificateId}`

  const handleDelete = useCallback(async () => {
    try {
      if (certificates) {
        await api.delete(CertificatesApis.deleteCertificate(certificateId))

        dispatch(setCertificates({ ...certificates, items: certificates?.items.filter((obj) => obj.certificateId == certificateId) }))
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [certificates, certificateId])

  const checkOptions = () => {
    const options: CustomDropdown[] = [
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

  return (
    <DefaultTableRowContainer dropdownOptions={checkOptions()}>
      <Link to={linkTo} className="col-span-2 py-3 flex">
        {profileImage?.url ? (
          <img
            src={profileImage?.url}
            className="h-8 w-8 rounded-full mr-2"
            alt={`${firstName} ${lastName} ${cemetery?.address}, ${cemetery?.name}, ${location}`}
          />
        ) : (
          <div className="h-8 w-8 rounded-full mr-2">
            <GeneralIcons type="UserPlaceholder" />
          </div>
        )}
        <Paragraph text={`${firstName} ${lastName}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={`${placeOfBirth}, ${formatDateYearMonthDay(dateOfBirth)}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={`${placeOfDeath}, ${formatDateYearMonthDay(dateOfDeath)}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="col-span-3 py-4">
        <Paragraph text={`${cemetery?.address}, ${cemetery?.name}, (${location.x}, ${location.y})`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="gap-x-2 py-4 pr-2">
        <CertificatesTableStatus status={status} />
      </Link>

      <Link to={linkTo} className="gap-x-2 py-4 pr-2">
        {certificate.pricing?.plan ? <CertificatesTablePricingPackage plan={certificate.pricing?.plan} /> : '-'}
      </Link>
    </DefaultTableRowContainer>
  )
}

export default CertificateTableRow
