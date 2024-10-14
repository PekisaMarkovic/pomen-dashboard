import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import OrdersApis from '../../../api/orders'
import customToast from '../../../components/core/toast/CustomToast'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { setOrders } from '../../../state/shared/orders'
import OrdersTop from './partials/OrdersTop'
import OrderTable from './table/OrderTable'
import { useSearchParams } from 'react-router-dom'

const AllOrders = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(OrdersApis.getOrders(), { params: { page } })
      dispatch(setOrders(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <OrdersTop />
      <OrderTable />
    </form>
  )
}

export default AllOrders
