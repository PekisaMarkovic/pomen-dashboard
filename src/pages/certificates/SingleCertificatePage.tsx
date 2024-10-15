import { FormProvider, useForm } from 'react-hook-form'
import SingleCertificate from '../../modules/certificates/certificate/SingleCertificate'
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks/reduxHooks'
import { useTranslation } from 'react-i18next'
import { useApi } from '../../hooks/use-api'
import { useCallback, useEffect } from 'react'
import CemeteriesApis from '../../api/cemeteries'
import { selectCemeteries, setCemeteryDropdownOptions } from '../../state/shared/cemeteries'
import customToast from '../../components/core/toast/CustomToast'
import CitiesApis from '../../api/cities'
import { selectCities, setCityDropdownOptions } from '../../state/shared/cities'
import CertificatesApis from '../../api/certificates'
import { useParams } from 'react-router-dom'
import {
  removeToEditCertificate,
  removetoEditCertificateFiles,
  selectCertificates,
  setToEditCertificate,
  setToEditCertificateFiles,
} from '../../state/shared/certificates'
import { mapCertificateToEdit } from '../../mapper/certificate'
import FileApis from '../../api/files'

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
      dispatch(setToEditCertificate(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchDataFiles = useCallback(async () => {
    try {
      const { data } = await api.get(FileApis.getFilesByCertificateId(Number(id)))
      dispatch(setToEditCertificateFiles(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData()
    fetchCemeteryDropdownOptions()
    fetchCityDropDown()
    fetchDataFiles()

    return () => {
      dispatch(removeToEditCertificate())
      dispatch(removetoEditCertificateFiles())
    }
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
