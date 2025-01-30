import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CemeteriesApis from '@/src/api/cemeteries'
import CitiesApis from '@/src/api/cities'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setCemeteries } from '@/src/state/shared/cemeteries'
import { setCityDropdownOptions } from '@/src/state/shared/cities'
import CemeteriesTop from '@/src/modules/cemeteries/cemetery-list/partials/CemeteriesTop'
import CemeteryTable from '@/src/modules/cemeteries/cemetery-list/table/CemeteryTable'
import { useSearchParams } from 'react-router-dom'

const AllCemeteries = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(CemeteriesApis.getCemeteries(), { params: { page } })
      dispatch(setCemeteries(data))
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
    fetchCityDropDown()
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <CemeteriesTop />
      <CemeteryTable />
    </form>
  )
}

export default AllCemeteries
