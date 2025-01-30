import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CertificatesApis from '@/src/api/certificates'
import GetheringsApis from '@/src/api/getherings'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setCertificateDropdownOptions } from '@/src/state/shared/certificates'
import { setGetherings } from '@/src/state/shared/getherings'
import GetheringsTop from './partials/GetheringsTop'
import GetheringsTable from './table/GetheringsTable'
import { setCityDropdownOptions } from '@/src/state/shared/cities'
import CitiesApis from '@/src/api/cities'
import { useSearchParams } from 'react-router-dom'
import { ModalEnums } from '@/src/enum/modal'

const AllGetherings = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(GetheringsApis.getGetherings(), { params: { page } })
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
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <GetheringsTop type={ModalEnums.ADD_GETHERING} />
      <GetheringsTable />
    </form>
  )
}

export default AllGetherings
