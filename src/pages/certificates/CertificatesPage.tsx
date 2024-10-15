import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllCertificates from '../../modules/certificates/certificates-list/AllCertificates'
import { useEffect } from 'react'
import { removeToEditCertificate, removetoEditCertificateFiles } from '../../state/shared/certificates'
import { useAppDispatch } from '../../state/redux-hooks/reduxHooks'

const CertificatesPage = () => {
  const methods = useForm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(removeToEditCertificate())
    dispatch(removetoEditCertificateFiles())
  }, [])

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllCertificates />
      </FormProvider>
    </GeneralLayout>
  )
}

export default CertificatesPage
