import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'

const ConvertLeadPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>ConvertLeadPage</FormProvider>
    </GeneralLayout>
  )
}

export default ConvertLeadPage
