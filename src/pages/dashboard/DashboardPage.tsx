import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'

const DashboardPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>DashboardPage</FormProvider>
    </GeneralLayout>
  )
}

export default DashboardPage
