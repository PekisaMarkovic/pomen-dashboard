import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllGetherings from '../../modules/getherings/gethering-list/AllGetherings'

const GetheringsPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllGetherings />
      </FormProvider>
    </GeneralLayout>
  )
}

export default GetheringsPage
