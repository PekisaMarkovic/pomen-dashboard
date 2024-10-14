import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllOrders from '../../modules/orders/cemetery-list/AllOrders'

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
