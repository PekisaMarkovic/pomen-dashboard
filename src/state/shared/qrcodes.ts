import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'
import { IQRcode } from '../../interfaces/qrcode'

type State = {
  qrcodes: Nullable<Paginated<IQRcode>>
  toEditQRcode: Nullable<IQRcode>
}

const initialState: State = {
  qrcodes: null,
  toEditQRcode: null,
}

const qrcodeSlice = createSlice({
  name: 'qrcodes',
  initialState,
  reducers: {
    initializeQRcodes: () => initialState,
    setQRcodes: (state, action: PayloadAction<Paginated<IQRcode>>) => {
      state.qrcodes = action.payload
    },
    addNewQRcode: (state, action: PayloadAction<IQRcode>) => {
      if (state.qrcodes) {
        state.qrcodes.items = [action.payload, ...state.qrcodes.items]
      }
    },
    setToEditQRcode: (state, action: PayloadAction<IQRcode>) => {
      state.toEditQRcode = action.payload
    },

    removeToEditQRcode: (state) => {
      state.toEditQRcode = null
    },
    removeQRcodes: (state) => {
      state.qrcodes = null
    },
  },
})

export const { initializeQRcodes, setQRcodes, removeQRcodes, addNewQRcode, setToEditQRcode, removeToEditQRcode } = qrcodeSlice.actions

export default qrcodeSlice.reducer

export const selectQRcodes = (state: AppState) => state.qrcodes
