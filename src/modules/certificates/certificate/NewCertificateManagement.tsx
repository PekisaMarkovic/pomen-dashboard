import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CertificatesApis from '../../../api/certificates'
import customToast from '../../../components/core/toast/CustomToast'
import { ROUTE_NAMES } from '../../../constatns/a-routes'
import { useApi } from '../../../hooks/use-api'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { formatDateYearMonthDay } from '../../../utils/date'
import CertificateCemeteryDetails from './partials/CertificateCemeteryDetails'
import CertificateLifeDetails from './partials/CertificateLifeDetails'
import CertificateOrderDetails from './partials/CertificateOrderDetails'

const NewCertificateManagement = () => {
  const { t } = useTranslation(['g'])
  const api = useApi()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { cemetery, dateOfBirth, dateOfDeath, ...rest } = values

    try {
      const { data } = await api.post(CertificatesApis.createCertificateNewUser(), {
        cemeteryId: Number(cemetery.id),
        ...rest,
        dateOfBirth: formatDateYearMonthDay(dateOfBirth),
        dateOfDeath: formatDateYearMonthDay(dateOfDeath),
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
