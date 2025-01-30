import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import AllQRcodes from '@/src/modules/qrcodes/qrcode-list/AllQRcodes'

const QRcodesPage = () => {
  const methods = useForm()

  return (
    <GeneralLayout isBottomHidden>
      <FormProvider {...methods}>
        <AllQRcodes />
      </FormProvider>
    </GeneralLayout>
  )
}

export default QRcodesPage
