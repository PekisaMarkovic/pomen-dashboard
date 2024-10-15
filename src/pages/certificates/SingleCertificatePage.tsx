import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import CemeteriesApis from '../../api/cemeteries'
import CertificatesApis from '../../api/certificates'
import CitiesApis from '../../api/cities'
import FileApis from '../../api/files'
import customToast from '../../components/core/toast/CustomToast'
import { useApi } from '../../hooks/use-api'
import { mapCertificateToEdit } from '../../mapper/certificate'
import SingleCertificate from '../../modules/certificates/certificate/SingleCertificate'
import { useAppDispatch, useAppSelector } from '../../state/redux-hooks/reduxHooks'
import { selectCemeteries, setCemeteryDropdownOptions } from '../../state/shared/cemeteries'
import { selectCertificates, setToEditCertificate, setToEditCertificateFiles } from '../../state/shared/certificates'
import { selectCities, setCityDropdownOptions } from '../../state/shared/cities'

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
