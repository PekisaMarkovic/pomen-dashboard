import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllCountries from '@/src/modules/countries/country-list/AllCountries'

const CountriesPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllCountries />
      </FormProvider>
    </GeneralLayout>
  )
}

export default CountriesPage
