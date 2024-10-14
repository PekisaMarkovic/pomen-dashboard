import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllCertificates from '../../modules/certificates/certificates-list/AllCertificates'

const CertificatesPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllCertificates />
      </FormProvider>
    </GeneralLayout>
  )
}

export default CertificatesPage
