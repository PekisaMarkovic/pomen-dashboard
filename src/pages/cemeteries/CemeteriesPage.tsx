import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllCemeteries from '../../modules/cemeteries/cemetery-list/AllCemeteries'

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
