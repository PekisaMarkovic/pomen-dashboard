import { useCallback, useEffect } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CemeteriesApis from '../../../api/cemeteries'
import CertificatesApis from '../../../api/certificates'
import CitiesApis from '../../../api/cities'
import customToast from '../../../components/core/toast/CustomToast'
import { ROUTE_NAMES } from '../../../constatns/a-routes'
import { useApi } from '../../../hooks/use-api'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { setCemeteryDropdownOptions } from '../../../state/shared/cemeteries'
import { setCityDropdownOptions } from '../../../state/shared/cities'
import { formatDateYearMonthDay } from '../../../utils/date'
import CertificateCemeteryDetails from './partials/CertificateCemeteryDetails'
import CertificateLifeDetails from './partials/CertificateLifeDetails'

const SingleCertificate = () => {
  const { t } = useTranslation(['g'])
  const dispatch = useAppDispatch()
  const api = useApi()
  const navigate = useNavigate()

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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { cemetery, dateOfBirth, dateOfDeath, ...rest } = values

    try {
      const { data } = await api.post(CertificatesApis.createCertificateNewUser(), {
        cemeteryId: Number(cemetery.id),
        ...rest,
        dateOfBirth: formatDateYearMonthDay(dateOfBirth),
        dateOfDeath: formatDateYearMonthDay(dateOfDeath),
      })

      navigate(`${ROUTE_NAMES.certificates}/${data.certificateId}`)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  useEffect(() => {
    fetchCemeteryDropdownOptions()
    fetchCityDropDown()
  }, [])

  return (
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit}>
      <CertificateLifeDetails />
      <CertificateCemeteryDetails />
    </GeneralLayout>
  )
}

export default SingleCertificate
