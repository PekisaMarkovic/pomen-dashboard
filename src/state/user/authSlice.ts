import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable } from '../../interfaces/general'
import { TokenPayload } from '../../interfaces/user'
import { State } from '../store'

export type AuthState = {
  user: Nullable<TokenPayload>
  accessToken: Nullable<string>
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: () => initialState,
    setUserData: (state, action: PayloadAction<{ tokenPayload: TokenPayload; accessToken: string }>) => {
      const { tokenPayload, accessToken } = action.payload
      state.user = tokenPayload
      state.accessToken = accessToken
      state.isAuthenticated = true
    },
    removeUserData: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { initializeAuth, setUserData, removeUserData } = authSlice.actions

export default authSlice.reducer

export const selectAuthUser = (state: State) => state.auth
