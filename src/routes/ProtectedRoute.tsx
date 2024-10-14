import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { selectAuthUser } from '../state/user/authSlice'
import { useAppSelector } from '../state/redux-hooks/reduxHooks'
import { RoleEnums } from '../enum/user'
import { ROUTE_NAMES } from '../constatns/a-routes'

type Props = {
  allowedRoles: RoleEnums[]
  children: ReactNode
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAppSelector(selectAuthUser)

  const location = useLocation()

  if (!isAuthenticated || !user) return <Navigate to={ROUTE_NAMES.index} />

  const userRoles = user.roles.map((role) => role.name)

  const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role))

  if (!hasRequiredRole) {
    return <Navigate to={ROUTE_NAMES.notFound} state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
