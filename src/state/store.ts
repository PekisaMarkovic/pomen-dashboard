import { configureStore } from '@reduxjs/toolkit'
import auth from '@/src/state/user/authSlice'
import modal from '@/src/state/shared/modal'
import countries from '@/src/state/shared/countries'
import cities from '@/src/state/shared/cities'
import cemeteries from '@/src/state/shared/cemeteries'
import qrcodes from '@/src/state/shared/qrcodes'
import orders from '@/src/state/shared/orders'
import certificates from '@/src/state/shared/certificates'
import contacts from '@/src/state/shared/contacts'
import tributes from '@/src/state/shared/tributes'
import getherings from '@/src/state/shared/getherings'
import behaviours from '@/src/state/shared/behaviours'
import blogs from '@/src/state/shared/blogs'

export const store = configureStore({
  reducer: {
    auth,
    countries,
    cities,
    behaviours,
    blogs,
    cemeteries,
    contacts,
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
