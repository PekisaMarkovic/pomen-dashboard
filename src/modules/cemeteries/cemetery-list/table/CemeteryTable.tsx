import PagginationWithoutUrl from '@/src/components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '@/src/components/table/DefaultTableSpace'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCemeteries } from '@/src/state/shared/cemeteries'
import { generateArrayOfLen } from '@/src/utils/array'
import CemeteryTableHeader from '@/src/modules/cemeteries/cemetery-list/table/CemeteryTableHeader'
import CemeteryTableRow from '@/src/modules/cemeteries/cemetery-list/table/CemeteryTableRow'

const CemeteryTable = () => {
  const { cemeteries } = useAppSelector(selectCemeteries)

  const leftSpaces = 10 - (cemeteries?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <CemeteryTableHeader />

      {cemeteries?.items.map((c) => <CemeteryTableRow key={c.cemeteryId} cementery={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={cemeteries?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default CemeteryTable
