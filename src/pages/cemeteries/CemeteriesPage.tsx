import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllCemeteries from '@/src/modules/cemeteries/cemetery-list/AllCemeteries'

const CemeteriesPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllCemeteries />
      </FormProvider>
    </GeneralLayout>
  )
}

export default CemeteriesPage
