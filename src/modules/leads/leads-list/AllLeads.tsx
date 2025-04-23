import LeadsApis from '@/src/api/leads'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setLeads } from '@/src/state/shared/leads'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import LeadsTable from '@/src/modules/leads/leads-list/table/LeadsTable'
import PricingsApis from '@/src/api/pricing'
import { setPricingDropdownOptions } from '@/src/state/shared/pricings'

const AllLeads = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(LeadsApis.getLeads(), { params: { page } })
      dispatch(setLeads(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchPricingDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(PricingsApis.getPricingOptions())
      dispatch(setPricingDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  useEffect(() => {
    fetchPricingDropDown()
  }, [])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <LeadsTable />
    </form>
  )
}

export default AllLeads
