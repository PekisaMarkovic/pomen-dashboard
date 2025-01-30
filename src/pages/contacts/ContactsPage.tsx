import { FormProvider, useForm } from 'react-hook-form'
import AllContacts from '@/src/modules/contacts/cemetery-list/AllContacts'
import GeneralLayout from '@/src/layouts/GeneralLayout'

const ContactsPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllContacts />
      </FormProvider>
    </GeneralLayout>
  )
}

export default ContactsPage
