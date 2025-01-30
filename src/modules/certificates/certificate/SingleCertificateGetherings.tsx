import { useCallback } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import customToast from '@/src/components/core/toast/CustomToast'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import CertificateTabs from '@/src/modules/certificates/certificate/partials/CertificateTabs'
import CertificateGetherings from '@/src/modules/certificates/certificate/partials/getherings/CertificateGetherings'

const SingleCertificateGetherings = () => {
  const { t } = useTranslation(['g'])
  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      console.log(values)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit} backButton={{ onClick: handleGoBack }} isBottomHidden>
      <CertificateTabs />

      <CertificateGetherings />
    </GeneralLayout>
  )
}

export default SingleCertificateGetherings
