import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchParams } from 'react-router-dom'
import { useApi } from '../../../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../../../state/redux-hooks/reduxHooks'
import GetheringsApis from '../../../../../api/getherings'
import { setGetherings } from '../../../../../state/shared/getherings'
import customToast from '../../../../../components/core/toast/CustomToast'
import CertificatesApis from '../../../../../api/certificates'
import { selectCertificates, setCertificateDropdownOptions } from '../../../../../state/shared/certificates'
import CitiesApis from '../../../../../api/cities'
import { setCityDropdownOptions } from '../../../../../state/shared/cities'
import GetheringsTop from '../../../../getherings/gethering-list/partials/GetheringsTop'
import GetheringsTable from '../../../../getherings/gethering-list/table/GetheringsTable'

const CertificateGetherings = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(GetheringsApis.getGetheringsByCertificateId(toEditCertificate!.certificateId), { params: { page } })
      dispatch(setGetherings(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchCertificateDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(CertificatesApis.getCertificateOptions())
      dispatch(setCertificateDropdownOptions(data))
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
    fetchCertificateDropDown()
    fetchCityDropDown()
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6 mt-4">
      <GetheringsTop />
      <GetheringsTable />
    </form>
  )
}

export default CertificateGetherings
