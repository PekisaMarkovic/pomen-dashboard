import PagginationWithoutUrl from '@/src/components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '@/src/components/table/DefaultTableSpace'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectOrder } from '@/src/state/shared/orders'
import { generateArrayOfLen } from '@/src/utils/array'
import OrderTableHeader from './OrderTableHeader'
import OrderTableRow from './OrderTableRow'

const OrderTable = () => {
  const { orders } = useAppSelector(selectOrder)

  const leftSpaces = 10 - (orders?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <OrderTableHeader />

      {orders?.items.map((o) => <OrderTableRow key={o.orderId} order={o} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={orders?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default OrderTable
