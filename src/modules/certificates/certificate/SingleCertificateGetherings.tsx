import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import customToast from '../../../components/core/toast/CustomToast'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../state/shared/certificates'
import CertificateTabs from './partials/CertificateTabs'
import CertificateGetherings from './partials/getherings/CertificateGetherings'

const SingleCertificateGetherings = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const { t } = useTranslation(['g'])

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      console.log(values)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit}>
      <CertificateTabs id={`${toEditCertificate?.certificateId}`} />

      <CertificateGetherings />
    </GeneralLayout>
  )
}

export default SingleCertificateGetherings
