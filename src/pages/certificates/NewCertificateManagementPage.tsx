import { FormProvider, useForm } from 'react-hook-form'
import NewCertificateManagement from '../../modules/certificates/certificate/NewCertificateManagement'
import { CREATE_CERTIFICATE_VALIDATION } from '../../validations/certificates/create-certificate-with-user'
import { useCallback, useEffect } from 'react'
import CitiesApis from '../../api/cities'
import CemeteriesApis from '../../api/cemeteries'
import { setCemeteryDropdownOptions } from '../../state/shared/cemeteries'
import { setCityDropdownOptions } from '../../state/shared/cities'
import { useAppDispatch } from '../../state/redux-hooks/reduxHooks'
import { useApi } from '../../hooks/use-api'
import customToast from '../../components/core/toast/CustomToast'
import { useTranslation } from 'react-i18next'

const NewCertificateManagementPage = () => {
  const methods = useForm({ resolver: CREATE_CERTIFICATE_VALIDATION })
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const api = useApi()

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

  useEffect(() => {
    fetchCemeteryDropdownOptions()
    fetchCityDropDown()
  }, [])

  return (
    <FormProvider {...methods}>
      <NewCertificateManagement />
    </FormProvider>
  )
}

export default NewCertificateManagementPage
