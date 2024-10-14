import CemeteryIcon from './CemeteryIcon'
import CertificateIcon from './CertificateIcon'
import CityIcon from './CityIcon'
import CountryIcon from './CountryIcon'
import DashboardIcon from './DashboardIcon'
import GetheringIcon from './GetheringIcon'
import OrderIcon from './OrderIcon'
import QRIcon from './QRIcon'
import TributeIcon from './TributeIcon'

export type NavigationIconType = 'City' | 'Order' | 'Getherings' | 'Dashboard' | 'Country' | 'Certificate' | 'QR' | 'Cemetery' | 'Tribute'
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

    default:
      return null
  }
}

export default NavigationIcons
