import CemeteryIcon from '@/src/icons/navigation/CemeteryIcon'
import CertificateIcon from '@/src/icons/navigation/CertificateIcon'
import CityIcon from '@/src/icons/navigation/CityIcon'
import CountryIcon from '@/src/icons/navigation/CountryIcon'
import DashboardIcon from '@/src/icons/navigation/DashboardIcon'
import GetheringIcon from '@/src/icons/navigation/GetheringIcon'
import MailIcon from '@/src/icons/navigation/MailIcon'
import OrderIcon from '@/src/icons/navigation/OrderIcon'
import QRIcon from '@/src/icons/navigation/QRIcon'
import TributeIcon from '@/src/icons/navigation/TributeIcon'
import BlogIcon from './BlogIcon'

export type NavigationIconType =
  | 'City'
  | 'Order'
  | 'Getherings'
  | 'Dashboard'
  | 'Country'
  | 'Certificate'
  | 'QR'
  | 'Cemetery'
  | 'Blog'
  | 'Tribute'
  | 'Mail'
interface Props extends React.SVGProps<SVGSVGElement> {
  type: NavigationIconType
}

const NavigationIcons = ({ type, ...rest }: Props) => {
  switch (type) {
    case 'City':
      return <CityIcon {...rest} />
    case 'Order':
      return <OrderIcon {...rest} />
    case 'Getherings':
      return <GetheringIcon {...rest} />
    case 'QR':
      return <QRIcon {...rest} />
    case 'Country':
      return <CountryIcon {...rest} />
    case 'Cemetery':
      return <CemeteryIcon {...rest} />
    case 'Tribute':
      return <TributeIcon {...rest} />
    case 'Dashboard':
      return <DashboardIcon {...rest} />
    case 'Certificate':
      return <CertificateIcon {...rest} />
    case 'Blog':
      return <BlogIcon {...rest} />
    case 'Mail':
      return <MailIcon {...rest} />

    default:
      return null
  }
}

export default NavigationIcons
