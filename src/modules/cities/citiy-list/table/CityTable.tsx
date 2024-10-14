import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCities } from '../../../../state/shared/cities'
import { generateArrayOfLen } from '../../../../utils/array'
import CityTableHeader from './CityTableHeader'
import CityTableRow from './CityTableRow'

const CityTable = () => {
  const { cities } = useAppSelector(selectCities)

  const leftSpaces = 10 - (cities?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <CityTableHeader />

      {cities?.items.map((c) => <CityTableRow key={c.cityId} city={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={cities?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default CityTable
