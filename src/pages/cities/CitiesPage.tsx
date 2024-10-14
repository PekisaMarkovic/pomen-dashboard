import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllCities from '../../modules/cities/citiy-list/AllCities'

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
