import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import CertificatesApis from '@/src/api/certificates'
import FileApis from '@/src/api/files'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import SingleCertificateTribures from '@/src/modules/certificates/certificate/SingleCertificateTribures'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCertificates, setToEditCertificate, setToEditCertificateFiles } from '@/src/state/shared/certificates'

const SingleCertificateTributesPage = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const api = useApi()
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    try {
      const { data } = await api.get(CertificatesApis.getCertificatesById(Number(id)))
      const { data: fileData } = await api.get(FileApis.getFilesByCertificateId(Number(id)))

      dispatch(setToEditCertificate(data))
      dispatch(setToEditCertificateFiles(fileData))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return <>{toEditCertificate ? <SingleCertificateTributesForm /> : null}</>
}

const SingleCertificateTributesForm = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <SingleCertificateTribures />
    </FormProvider>
  )
}

export default SingleCertificateTributesPage
