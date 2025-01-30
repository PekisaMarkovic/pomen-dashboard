import PagginationWithoutUrl from '@/src/components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '@/src/components/table/DefaultTableSpace'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectTributes } from '@/src/state/shared/tributes'
import { generateArrayOfLen } from '@/src/utils/array'
import TributeTableHeader from './TributeTableHeader'
import TributeTableRow from './TributeTableRow'

const TributeTable = () => {
  const { tributes } = useAppSelector(selectTributes)

  const leftSpaces = 10 - (tributes?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <TributeTableHeader />

      {tributes?.items.map((t) => <TributeTableRow key={t.tributeId} tribute={t} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={tributes?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default TributeTable
