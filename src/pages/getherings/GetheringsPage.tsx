import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllGetherings from '@/src/modules/getherings/gethering-list/AllGetherings'

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
