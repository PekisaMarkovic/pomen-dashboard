import { configureStore } from '@reduxjs/toolkit'
import auth from './user/authSlice'
import modal from './shared/modal'
import countries from './shared/countries'
import cities from './shared/cities'
import cemeteries from './shared/cemeteries'
import qrcodes from './shared/qrcodes'
import orders from './shared/orders'
import certificates from './shared/certificates'
import tributes from './shared/tributes'
import getherings from './shared/getherings'
import behaviours from './shared/behaviours'

export const store = configureStore({
  reducer: {
    auth,
    countries,
    cities,
    behaviours,
    cemeteries,
    getherings,
    qrcodes,
    orders,
    tributes,
    certificates,
    modal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const getStoreState = () => store.getState()
