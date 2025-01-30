import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CitiesApis from '@/src/api/cities'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setCities } from '@/src/state/shared/cities'
import CityTop from './partials/CityTop'
import CityTable from './table/CityTable'
import CountriesApis from '@/src/api/countries'
import { setCountryDropdownOptions } from '@/src/state/shared/countries'
import { useSearchParams } from 'react-router-dom'

const AllCities = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(
    async (page: string) => {
      try {
        const { data } = await api.get(CitiesApis.getCities(), { params: { page } })
        dispatch(setCities(data))
      } catch {
        customToast.error(t('g:errorMessage'))
      }
    },
    [page],
  )

  const fetchCountryDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(CountriesApis.getCountryOptions())
      dispatch(setCountryDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchCountryDropDown()
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <CityTop />
      <CityTable />
    </form>
  )
}

export default AllCities
