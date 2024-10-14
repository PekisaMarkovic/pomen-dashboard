import { Route } from 'react-router-dom'
import { ROUTES as appRoutes } from './routes'

export const ALL_ROUTES = appRoutes.map((route) => (
  <Route key={route.path} path={route.path} element={route.element}>
    {route.children?.map((childRoute) => <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />)}
  </Route>
))
