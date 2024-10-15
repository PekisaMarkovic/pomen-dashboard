import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import MainLink from '../../../../components/core/buttons/MainLink'
import NavigationTab from '../../../../components/core/navigation/NavigationTab'
import TabSection from '../../../../components/section/TabSection'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import { SINGLE_CERTIFICATE_TABS } from '../../../../constatns/certificate'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../../state/shared/certificates'
import { calculateArrayCompleteness, calculateCompleteness } from '../../../../utils/perc'

const CertificateTabs = () => {
  const { t } = useTranslation(['certificate'])
  const { toEditCertificate, toEditCertificateFiles } = useAppSelector(selectCertificates)
  const id = `${toEditCertificate?.certificateId}`
  const { pathname } = useLocation()

  const calcPercentage = (text: string) => {
    switch (text) {
      case 'life':
        return calculateCompleteness(
          { ...toEditCertificate, videos: toEditCertificateFiles?.videos || [], images: toEditCertificateFiles?.images || [] },
          ['city', 'getherings', 'tributes', 'deletedAt', 'updatedAt', 'timeOfDeath'],
        )

      case 'getherings':
        return calculateArrayCompleteness(toEditCertificate?.getherings.length || 0)

      case 'tributes':
        return calculateArrayCompleteness(toEditCertificate?.tributes.length || 0)

      default:
        return 0
    }
  }

  return (
    <div className="flex align-baseline">
      <TabSection>
        {SINGLE_CERTIFICATE_TABS.map(({ text, icon, link }, index) => (
          <NavigationTab
            noPerc={text === 'activity'}
            text={t(`certificate:tabs.${text}`)}
            href={link(id)}
            isActiv={pathname === link(id)}
            variant="tab"
            leftIcon={icon}
            key={index}
            perc={calcPercentage(text) || 0}
          />
        ))}
      </TabSection>
      <div className="flex-0">
        <MainLink
          text={t('g:button.preview')}
          href={`${ROUTE_NAMES.certificates}/${toEditCertificate?.certificateId}${ROUTE_NAMES.previews}`}
          size="medium"
          variant="alternative"
          rightIcon={null}
        />
      </div>
    </div>
  )
}

export default CertificateTabs
