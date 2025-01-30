import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllTributes from '@/src/modules/tributes/tributes-list/AllTributes'

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
