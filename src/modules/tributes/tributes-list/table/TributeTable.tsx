import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectTributes } from '../../../../state/shared/tributes'
import { generateArrayOfLen } from '../../../../utils/array'
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
