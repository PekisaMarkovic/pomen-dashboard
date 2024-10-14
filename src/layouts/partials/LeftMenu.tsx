import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import NavigationLink from '../../components/core/navigation/NavigationLink'
import Heading from '../../components/core/typography/Heading'
import { LEFT_SIDE_MENU_LINKS } from '../../constatns/navigation'
import { checkIsLinkActiv } from '../../utils/route'
import NavigationIcons from '../../icons/navigation'

const LeftMenu = () => {
  const { t } = useTranslation(['static'])
  const { pathname } = useLocation()

  return (
    <div className="py-8 px-5 flex flex-col gap-y-8 border-r-1 border-r-lighy-grey border-solid h-full w-full">
      <div className="px-0.5 flex items-baseline">POMEN LOGO</div>
      <div className="px-0.5 flex flex-col gap-y-6">
        <Heading text={t('static:navigation.leftSide.title')} variant="2" size="base" color="grey" />
        <div className="flex flex-col gap-y-4">
          {LEFT_SIDE_MENU_LINKS.map(({ text, icon, link }, index) => (
            <NavigationLink
              isActiv={checkIsLinkActiv(pathname, link)}
              href={link}
              text={t(`static:navigation.leftSide.${text}`)}
              variant="side"
              leftIcon={<NavigationIcons type={icon} />}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftMenu
