import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthApis from '../api/auth'
import { ROUTE_NAMES } from '../constatns/a-routes'
import { useAppDispatch } from '../state/redux-hooks/reduxHooks'
import { removeUserData, setUserData } from '../state/user/authSlice'
import { clearLocalStorageTokens, getAccessToken, getTokenPayload } from '../utils/token'
import { useApi } from './use-api'

const unprotectedRoutes = [ROUTE_NAMES.index, ROUTE_NAMES.firtTimeRegister, ROUTE_NAMES.createCertificate, ROUTE_NAMES.notFound]

export const useAuth = () => {
  const api = useApi()
  const [isLoad, setIsLoad] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleUnauthorized = useCallback(() => {
    dispatch(removeUserData())
    clearLocalStorageTokens()
    navigate(ROUTE_NAMES.index)
  }, [dispatch, navigate])

  const initializeAuth = useCallback(async () => {
    try {
      const accessToken = getAccessToken()
      const tokenPayload = getTokenPayload()

      if (!tokenPayload || !accessToken) {
        if (!unprotectedRoutes.includes(pathname)) {
          handleUnauthorized()
        }
        return
      }

      const { data } = await api.post(AuthApis.isUserTokenValid())

      if (data) {
        dispatch(setUserData({ tokenPayload, accessToken }))
      }
    } catch {
      handleUnauthorized()
    } finally {
      setIsLoad(true)
    }
  }, [dispatch, handleUnauthorized])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return { isLoad }
}
