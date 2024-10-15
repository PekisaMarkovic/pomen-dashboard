import { useCallback } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import customToast from '../../../components/core/toast/CustomToast'
import GeneralLayout from '../../../layouts/GeneralLayout'
import CertificateTabs from './partials/CertificateTabs'
import CertificateTributes from './partials/tributes/CertificateTributes'

const SingleCertificateTribures = () => {
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
      <CertificateTributes />
    </GeneralLayout>
  )
}

export default SingleCertificateTribures
