import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCountry } from '../../../../state/shared/countries'
import { generateArrayOfLen } from '../../../../utils/array'
import CountryTableHeader from './CountryTableHeader'
import CountryTableRow from './CountryTableRow'

const CountryTable = () => {
  const { countries } = useAppSelector(selectCountry)

  const leftSpaces = 10 - (countries?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <CountryTableHeader />

      {countries?.items.map((c) => <CountryTableRow key={c.countryId} country={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={countries?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default CountryTable
