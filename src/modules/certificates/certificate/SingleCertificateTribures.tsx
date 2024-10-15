import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import customToast from '../../../components/core/toast/CustomToast'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../state/shared/certificates'
import CertificateTabs from './partials/CertificateTabs'
import CertificateTributes from './partials/tributes/CertificateTributes'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const SingleCertificateTribures = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
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
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit} backButton={{ onClick: handleGoBack }}>
      <CertificateTabs id={`${toEditCertificate?.certificateId}`} />
      <CertificateTributes />
    </GeneralLayout>
  )
}

export default SingleCertificateTribures
