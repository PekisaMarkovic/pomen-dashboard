import type { ReactNode } from 'react'

import { Route, Routes as Switch } from 'react-router-dom'
import { ROUTE_NAMES } from '../constatns/a-routes'
import { RoleEnums } from '../enum/user'
import CemeteriesPage from '../pages/cemeteries/CemeteriesPage'
import CertificatesPage from '../pages/certificates/CertificatesPage'
import NewCertificateManagementPage from '../pages/certificates/NewCertificateManagementPage'
import NewCertificatePage from '../pages/certificates/NewCertificatePage'
import SingleCertificateGetheringsPage from '../pages/certificates/SingleCertificateGetheringsPage'
import SingleCertificatePage from '../pages/certificates/SingleCertificatePage'
import SingleCertificateTributesPage from '../pages/certificates/SingleCertificateTributesPage'
import CitiesPage from '../pages/cities/CitiesPage'
import CountriesPage from '../pages/countries/CountriesPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import GetheringsPage from '../pages/getherings/GetheringsPage'
import LogInPage from '../pages/log-in/LogInPage'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import OrdersPage from '../pages/order/OrdersPage'
import QRcodesPage from '../pages/qrcodes/QRcodesPage'
import TributesPage from '../pages/tributes/TributesPage'
import ProtectedRoute from './ProtectedRoute'
import SignUpPage from '../pages/log-in/SignUpPage'
import FirstTimeRegisterPage from '../pages/log-in/FirstTimeRegisterPage'

const ALL_ROLES = [RoleEnums.USER, RoleEnums.ADMIN, RoleEnums.SUPER_ADMIN]

type Route = {
  path: string
  element: ReactNode
  children?: Route[]
}

const AppRoutes = () => {
  const appRoutes: Route[] = [
    {
      path: ROUTE_NAMES.index,
      element: <LogInPage />,
    },

    {
      path: ROUTE_NAMES.createCertificate,
      element: <div>TODO</div>,
    },

    {
      path: ROUTE_NAMES.firtTimeRegister,
      element: <FirstTimeRegisterPage />,
    },

    {
      path: ROUTE_NAMES.signUp,
      element: <SignUpPage />,
    },

    {
      path: ROUTE_NAMES.profile,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <div>TODO</div>
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.dashboard,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.countries,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <CountriesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.qrcodes,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <QRcodesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.orderes,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <OrdersPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.cities,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <CitiesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.tributes,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <TributesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.getherings,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <GetheringsPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.cemeteries,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <CemeteriesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.certificates,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <CertificatesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.certificateById,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <SingleCertificatePage />
        </ProtectedRoute>
      ),
    },

    {
      path: `${ROUTE_NAMES.certificateById}${ROUTE_NAMES.tributes}`,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <SingleCertificateTributesPage />
        </ProtectedRoute>
      ),
    },

    {
      path: `${ROUTE_NAMES.certificateById}${ROUTE_NAMES.getherings}`,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <SingleCertificateGetheringsPage />
        </ProtectedRoute>
      ),
    },

    {
      path: `${ROUTE_NAMES.certificateById}${ROUTE_NAMES.previews}`,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <SingleCertificatePage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.newCerificate,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <NewCertificatePage />
        </ProtectedRoute>
      ),
    },

    {
      path: ROUTE_NAMES.newCerificateManagement,
      element: (
        <ProtectedRoute allowedRoles={ALL_ROLES}>
          <NewCertificateManagementPage />
        </ProtectedRoute>
      ),
    },

    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]

  return (
    <Switch>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children?.map((childRoute) => <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />)}
        </Route>
      ))}
    </Switch>
  )
}

export default AppRoutes
