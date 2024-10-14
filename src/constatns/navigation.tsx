import NavigationIcons from '../icons/navigation'
import { ROUTE_NAMES } from './a-routes'

export const LEFT_SIDE_MENU_LINKS = [
  { text: 'dashboard', icon: <NavigationIcons type="Dashboard" />, link: ROUTE_NAMES.dashboard },
  { text: 'orders', icon: <NavigationIcons type="Order" />, link: ROUTE_NAMES.orderes },
  { text: 'certificates', icon: <NavigationIcons type="Certificate" />, link: ROUTE_NAMES.certificates },
  { text: 'getherings', icon: <NavigationIcons type="Getherings" />, link: ROUTE_NAMES.getherings },
  { text: 'tributes', icon: <NavigationIcons type="Tribute" />, link: ROUTE_NAMES.tributes },
  { text: 'qrcodes', icon: <NavigationIcons type="QR" />, link: ROUTE_NAMES.qrcodes },
  { text: 'cemeteries', icon: <NavigationIcons type="Cemetery" />, link: ROUTE_NAMES.cemeteries },
  { text: 'cities', icon: <NavigationIcons type="City" />, link: ROUTE_NAMES.cities },
  { text: 'countries', icon: <NavigationIcons type="Country" />, link: ROUTE_NAMES.countries },
]

export const TOP_MENU_LINKS_FOR_TRANSLATIONS = [
  ...LEFT_SIDE_MENU_LINKS.map((e) => e.link),
  ROUTE_NAMES.newCerificate,
  ROUTE_NAMES.newCerificateManagement,
]
