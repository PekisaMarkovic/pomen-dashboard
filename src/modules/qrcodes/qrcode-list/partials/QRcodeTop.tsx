import { useTranslation } from 'react-i18next'
import InputTextSearch from '../../../../components/core/input/InputTextSearch'

const QRcodeTop = () => {
  const { t } = useTranslation(['g', 'tl'])

  return (
    <div className="mb-6 flex gap-x-6 gap-y-4 flex-wrap">
      <div className="bg-white rounded-xxxl w-96">
        <InputTextSearch name="searchTerm" placeholder={t('g:search')} />
      </div>
      <div className="ml-auto py-4 mt-1.5" />
    </div>
  )
}

export default QRcodeTop
