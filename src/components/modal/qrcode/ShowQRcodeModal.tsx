import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../state/redux-hooks/reduxHooks'
import { selectQRcodes } from '../../../state/shared/qrcodes'
import Heading from '../../core/typography/Heading'

const ShowQRcodeModal = () => {
  const { t } = useTranslation(['qrcode'])
  const { toEditQRcode } = useAppSelector(selectQRcodes)

  return (
    <>
      <Heading text={t('qrcode:scan')} variant="2" size="base" color="grey" />
      <div className="flex flex-col items-center justify-center gap-y-4 mt-6">
        <img
          src={toEditQRcode!.value}
          className="h-42 w-42 cursor-pointer"
          alt={`${toEditQRcode!.certificate?.firstName} ${toEditQRcode!.certificate?.lastName} ${toEditQRcode!.certificate?.slug}`}
        />
      </div>
    </>
  )
}

export default ShowQRcodeModal
