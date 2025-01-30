import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import CemeteriesApis from '@/src/api/cemeteries'
import CertificatesApis from '@/src/api/certificates'
import CitiesApis from '@/src/api/cities'
import FileApis from '@/src/api/files'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { mapCertificateToEdit } from '@/src/mapper/certificate'
import SingleCertificate from '@/src/modules/certificates/certificate/SingleCertificate'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCemeteries, setCemeteryDropdownOptions } from '@/src/state/shared/cemeteries'
import { selectCertificates, setToEditCertificate, setToEditCertificateFiles } from '@/src/state/shared/certificates'
import { selectCities, setCityDropdownOptions } from '@/src/state/shared/cities'

const SingleCertificatePage = () => {
  const { toEditCertificate, toEditCertificateFiles } = useAppSelector(selectCertificates)

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const api = useApi()
  const { id } = useParams()

  const fetchCemeteryDropdownOptions = useCallback(async () => {
    try {
      const { data } = await api.get(CemeteriesApis.getCemeteryOptions())
      dispatch(setCemeteryDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchCityDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(CitiesApis.getCityOptions())
      dispatch(setCityDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

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
    fetchCemeteryDropdownOptions()
    fetchCityDropDown()
  }, [])

  return <>{toEditCertificate && toEditCertificateFiles ? <SingleCertificateForm /> : null}</>
}

const SingleCertificateForm = () => {
  const { dropdownOptions: citiesOptions } = useAppSelector(selectCities)
  const { dropdownOptions: cemeteriesOptions } = useAppSelector(selectCemeteries)
  const { toEditCertificate, toEditCertificateFiles } = useAppSelector(selectCertificates)

  const methods = useForm({
    defaultValues: mapCertificateToEdit({
      certificate: toEditCertificate!,
      citiesOptions: citiesOptions.options,
      cemeteriesOptions: cemeteriesOptions.options,
      certificateFile: toEditCertificateFiles!,
    }),
  })

  return (
    <FormProvider {...methods}>
      <SingleCertificate />
    </FormProvider>
  )
}

export default SingleCertificatePage
