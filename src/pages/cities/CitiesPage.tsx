import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllCities from '@/src/modules/cities/citiy-list/AllCities'

const CitiesPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllCities />
      </FormProvider>
    </GeneralLayout>
  )
}

export default CitiesPage
