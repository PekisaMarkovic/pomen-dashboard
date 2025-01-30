import PagginationWithoutUrl from '@/src/components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '@/src/components/table/DefaultTableSpace'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectContacts } from '@/src/state/shared/contacts'
import { generateArrayOfLen } from '@/src/utils/array'
import ContactTableHeader from './ContactTableHeader'
import ContactTableRow from './ContactTableRow'

const ContactTable = () => {
  const { contacts } = useAppSelector(selectContacts)

  const leftSpaces = 10 - (contacts?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <ContactTableHeader />

      {contacts?.items.map((c) => <ContactTableRow key={c.contactId} contact={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={contacts?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default ContactTable
