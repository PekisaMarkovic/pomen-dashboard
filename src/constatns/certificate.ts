import { ROUTE_NAMES } from './a-routes'

export const SINGLE_CERTIFICATE_TABS = [
  { text: 'life', icon: null, link: (id: string) => `${ROUTE_NAMES.certificates}/${id}` },
  { text: 'getherings', icon: null, link: (id: string) => `${ROUTE_NAMES.certificates}/${id}${ROUTE_NAMES.getherings}` },
  { text: 'tributes', icon: null, link: (id: string) => `${ROUTE_NAMES.certificates}/${id}${ROUTE_NAMES.tributes}` },
]
