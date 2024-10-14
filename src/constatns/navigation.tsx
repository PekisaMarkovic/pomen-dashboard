import { NavigationIconType } from '../icons/navigation'
import { ROUTE_NAMES } from './a-routes'

interface IMenuLink {
  text: string
  icon: NavigationIconType
  link: string
}

export const LEFT_SIDE_MENU_LINKS: IMenuLink[] = [
  { text: 'dashboard', icon: 'Dashboard', link: ROUTE_NAMES.dashboard },
  { text: 'orders', icon: 'Order', link: ROUTE_NAMES.orderes },
  { text: 'certificates', icon: 'Certificate', link: ROUTE_NAMES.certificates },
  { text: 'getherings', icon: 'Getherings', link: ROUTE_NAMES.getherings },
  { text: 'tributes', icon: 'Tribute', link: ROUTE_NAMES.tributes },
  { text: 'qrcodes', icon: 'QR', link: ROUTE_NAMES.qrcodes },
  { text: 'cemeteries', icon: 'Cemetery', link: ROUTE_NAMES.cemeteries },
  { text: 'cities', icon: 'City', link: ROUTE_NAMES.cities },
  { text: 'countries', icon: 'Country', link: ROUTE_NAMES.countries },
]

export const TOP_MENU_LINKS_FOR_TRANSLATIONS = [
  ...LEFT_SIDE_MENU_LINKS.map((e) => e.link),
  ROUTE_NAMES.newCerificate,
  ROUTE_NAMES.newCerificateManagement,
]
