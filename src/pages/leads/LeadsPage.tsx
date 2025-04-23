import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllLeads from '@/src/modules/leads/leads-list/AllLeads'

const LeadPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllLeads />
      </FormProvider>
    </GeneralLayout>
  )
}

export default LeadPage
