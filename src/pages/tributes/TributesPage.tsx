import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllTributes from '../../modules/tributes/tributes-list/AllTributes'

const TributesPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllTributes />
      </FormProvider>
    </GeneralLayout>
  )
}

export default TributesPage
