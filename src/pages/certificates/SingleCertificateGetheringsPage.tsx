import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import CertificatesApis from '../../api/certificates'
import customToast from '../../components/core/toast/CustomToast'
import { useApi } from '../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks/reduxHooks'
import { selectCertificates, setToEditCertificate } from '../../state/shared/certificates'
import SingleCertificateGetherings from '../../modules/certificates/certificate/SingleCertificateGetherings'

const SingleCertificateGetheringsPage = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const api = useApi()
  const { id } = useParams()

  const fetchData = useCallback(async () => {
    try {
      const { data } = await api.get(CertificatesApis.getCertificatesById(Number(id)))
      dispatch(setToEditCertificate(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return <>{toEditCertificate ? <SingleCertificateGetheringsForm /> : null}</>
}

const SingleCertificateGetheringsForm = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <SingleCertificateGetherings />
    </FormProvider>
  )
}

export default SingleCertificateGetheringsPage
