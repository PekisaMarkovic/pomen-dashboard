import PagginationWithoutUrl from '@/src/components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '@/src/components/table/DefaultTableSpace'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectLeads } from '@/src/state/shared/leads'
import { generateArrayOfLen } from '@/src/utils/array'
import LeadsTableHeader from '@/src/modules/leads/leads-list/table/LeadsTableHeader'
import LeadsTableRow from '@/src/modules/leads/leads-list/table/LeadsTableRow'

const LeadsTable = () => {
  const { leads } = useAppSelector(selectLeads)

  const leftSpaces = 10 - (leads?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <LeadsTableHeader />

      {leads?.items.map((l) => <LeadsTableRow key={l.leadId} lead={l} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={leads?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default LeadsTable
