import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'
import { IGethering } from '../../interfaces/getherings'

type State = {
  getherings: Nullable<Paginated<IGethering>>
  toEditGethering: Nullable<IGethering>
}

const initialState: State = {
  getherings: null,
  toEditGethering: null,
}

const getheringslice = createSlice({
  name: 'getherings',
  initialState,
  reducers: {
    initializeGetherings: () => initialState,

    setGetherings: (state, action: PayloadAction<Paginated<IGethering>>) => {
      state.getherings = action.payload
    },

    addNewGethering: (state, action: PayloadAction<IGethering>) => {
      if (state.getherings) {
        state.getherings.items = [action.payload, ...state.getherings.items]
      }
    },

    setToEditGethering: (state, action: PayloadAction<IGethering>) => {
      state.toEditGethering = action.payload
    },

    removeToEditGethering: (state) => {
      state.toEditGethering = null
    },

    removeGetherings: (state) => {
      state.getherings = null
    },

    updateGethering: (state, action: PayloadAction<Partial<IGethering>>) => {
      if (state.getherings && action.payload.getheringId) {
        state.getherings.items = state.getherings.items.map((gethering) => {
          if (gethering.getheringId === gethering.getheringId) {
            return { ...gethering, ...action.payload }
          }
          return gethering
        })
      }
    },
  },
})

export const { initializeGetherings, setGetherings, removeGetherings, addNewGethering, setToEditGethering, removeToEditGethering, updateGethering } =
  getheringslice.actions

export default getheringslice.reducer

export const selectGetherings = (state: AppState) => state.getherings
