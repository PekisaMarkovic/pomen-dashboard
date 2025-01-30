import { useTranslation } from 'react-i18next'
import MainLink from '@/src/components/core/buttons/MainLink'
import InputTextSearch from '@/src/components/core/input/InputTextSearch'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { getUserRoles } from '@/src/state/utils'

const CertificatesTop = () => {
  const { t } = useTranslation(['g', 'tl'])

  const { isAdminOrSuperAdmin } = getUserRoles()

  return (
    <div className="mb-6 flex gap-x-6 gap-y-4 flex-wrap">
      <div className="bg-white rounded-xxxl w-96">
        <InputTextSearch name="searchTerm" placeholder={t('g:search')} />
      </div>
      <div className="ml-auto">
        <MainLink
          text={t('g:button.addCertificate')}
          variant="contained"
          size="medium"
          href={isAdminOrSuperAdmin ? ROUTE_NAMES.newCerificateManagement : ROUTE_NAMES.newCerificate}
        />
      </div>
    </div>
  )
}

export default CertificatesTop
