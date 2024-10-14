import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectGetherings } from '../../../../state/shared/getherings'
import { generateArrayOfLen } from '../../../../utils/array'
import GetheringTableHeader from './GetheringTableHeader'
import GetheringTableRow from './GetheringTableRow'

const GetheringsTable = () => {
  const { getherings } = useAppSelector(selectGetherings)

  const leftSpaces = 10 - (getherings?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <GetheringTableHeader />

      {getherings?.items.map((g) => <GetheringTableRow key={g.getheringId} gethering={g} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={getherings?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default GetheringsTable
