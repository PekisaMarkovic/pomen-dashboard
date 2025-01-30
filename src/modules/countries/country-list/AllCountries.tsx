import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CountriesApis from '@/src/api/countries'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setCountries } from '@/src/state/shared/countries'
import CountryTop from './partials/CountryTop'
import CountryTable from './table/CountryTable'
import { useSearchParams } from 'react-router-dom'

const AllCountries = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(CountriesApis.getCountries(), { params: { page } })
      dispatch(setCountries(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <CountryTop />
      <CountryTable />
    </form>
  )
}

export default AllCountries
