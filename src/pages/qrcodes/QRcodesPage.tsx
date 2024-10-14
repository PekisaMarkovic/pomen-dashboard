import { FormProvider, useForm } from 'react-hook-form'
import GeneralLayout from '../../layouts/GeneralLayout'
import AllQRcodes from '../../modules/qrcodes/qrcode-list/AllQRcodes'

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
