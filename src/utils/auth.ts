import { TokenData } from '@/src/interfaces'
import { store } from '@/src/state/store'
import { setUserData } from '@/src/state/user/authSlice'
import { decodeToken, setLocalStorageTokens } from './token'

export const signIn = (data: TokenData) => {
  const { dispatch } = store
  const { access_token, refresh_token } = data

  setLocalStorageTokens(access_token, refresh_token)

  const tokenPayload = decodeToken(access_token)

  dispatch(setUserData({ tokenPayload, accessToken: access_token }))
}
