import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable } from '@/src/interfaces/general'
import { TokenPayload } from '@/src/interfaces/user'
import { State } from '@/src/state/store'

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
    setUserProfileData: (state, action: PayloadAction<{ user: TokenPayload }>) => {
      state.user = action.payload.user
    },
    removeUserData: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { initializeAuth, setUserData, removeUserData, setUserProfileData } = authSlice.actions

export default authSlice.reducer

export const selectAuthUser = (state: State) => state.auth
