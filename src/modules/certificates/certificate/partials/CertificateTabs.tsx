import { useTranslation } from 'react-i18next'
import MainLink from '../../../../components/core/buttons/MainLink'
import NavigationTab from '../../../../components/core/navigation/NavigationTab'
import { SINGLE_CERTIFICATE_TABS } from '../../../../constatns/certificate'
import { useLocation } from 'react-router-dom'
import TabSection from '../../../../components/section/TabSection'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../../state/shared/certificates'

type Props = {
  id: string
}

const CertificateTabs = ({ id }: Props) => {
  const { t } = useTranslation(['certificate'])
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const { pathname } = useLocation()

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
            perc={0}
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
