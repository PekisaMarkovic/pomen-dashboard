import CertificatesApis from '@/src/api/certificates'
import LeadsApis from '@/src/api/leads'
import customToast from '@/src/components/core/toast/CustomToast'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { LeadStatusEnums } from '@/src/enum'
import { useApi } from '@/src/hooks/use-api'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import CertificateCemeteryDetails from '@/src/modules/certificates/certificate/partials/CertificateCemeteryDetails'
import CertificateLifeDetails from '@/src/modules/certificates/certificate/partials/CertificateLifeDetails'
import CertificateOrderDetails from '@/src/modules/certificates/certificate/partials/CertificateOrderDetails'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectLeads } from '@/src/state/shared/leads'
import { formatToIsoDate } from '@/src/utils/date'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ConvertLead = () => {
  const { t } = useTranslation(['g'])
  const api = useApi()
  const navigate = useNavigate()
  const { toConvertLead } = useAppSelector(selectLeads)

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { cemetery, dateOfBirth, dateOfDeath, city, pricingPlan, ...rest } = values

    try {
      const { data } = await api.post(CertificatesApis.createCertificateNewUser(), {
        cemeteryId: Number(cemetery.id),
        pricingId: Number(pricingPlan.id),
        leadId: toConvertLead!.leadId,
        ...rest,
        dateOfBirth: formatToIsoDate(dateOfBirth),
        dateOfDeath: formatToIsoDate(dateOfDeath),
        ...(city ? { cityId: Number(city.id) } : {}),
      })
      await api.patch(LeadsApis.patchLeadStatus(toConvertLead!.leadId), { status: LeadStatusEnums.CONVERTED })

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

export default ConvertLead
