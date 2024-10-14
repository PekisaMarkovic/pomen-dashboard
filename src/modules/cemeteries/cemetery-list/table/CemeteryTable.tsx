import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCemeteries } from '../../../../state/shared/cemeteries'
import { generateArrayOfLen } from '../../../../utils/array'
import CemeteryTableHeader from './CemeteryTableHeader'
import CemeteryTableRow from './CemeteryTableRow'

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
