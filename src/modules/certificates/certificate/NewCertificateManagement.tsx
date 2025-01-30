import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CertificatesApis from '@/src/api/certificates'
import customToast from '@/src/components/core/toast/CustomToast'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { useApi } from '@/src/hooks/use-api'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import { formatDateYearMonthDay } from '@/src/utils/date'
import CertificateCemeteryDetails from '@/src/modules/certificates/certificate/partials/CertificateCemeteryDetails'
import CertificateLifeDetails from '@/src/modules/certificates/certificate/partials/CertificateLifeDetails'
import CertificateOrderDetails from '@/src/modules/certificates/certificate/partials/CertificateOrderDetails'

const NewCertificateManagement = () => {
  const { t } = useTranslation(['g'])
  const api = useApi()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { cemetery, dateOfBirth, dateOfDeath, city, ...rest } = values

    try {
      const { data } = await api.post(CertificatesApis.createCertificateNewUser(), {
        cemeteryId: Number(cemetery.id),
        ...rest,
        dateOfBirth: formatDateYearMonthDay(dateOfBirth),
        dateOfDeath: formatDateYearMonthDay(dateOfDeath),
        ...(city ? { cityId: Number(city.id) } : {}),
      })

      navigate(`${ROUTE_NAMES.certificates}/${data.certificateId}`)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit}>
      <CertificateOrderDetails />
      <CertificateLifeDetails />
      <CertificateCemeteryDetails />
    </GeneralLayout>
  )
}

export default NewCertificateManagement
