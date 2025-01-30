import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllOrders from '@/src/modules/orders/cemetery-list/AllOrders'

const OrdersPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllOrders />
      </FormProvider>
    </GeneralLayout>
  )
}

export default OrdersPage
