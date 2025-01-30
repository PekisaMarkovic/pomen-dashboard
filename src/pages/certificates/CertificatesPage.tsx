import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllCertificates from '@/src/modules/certificates/certificates-list/AllCertificates'
import { useEffect } from 'react'
import { removeToEditCertificate, removetoEditCertificateFiles } from '@/src/state/shared/certificates'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'

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
