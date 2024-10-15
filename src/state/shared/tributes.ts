import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'
import { ITribute } from '../../interfaces/tributes'

type State = {
  tributes: Nullable<Paginated<ITribute>>
  toEditTribute: Nullable<ITribute>
}

const initialState: State = {
  tributes: null,
  toEditTribute: null,
}

const tributeSlice = createSlice({
  name: 'tributes',
  initialState,
  reducers: {
    initializeTributes: () => initialState,

    setTributes: (state, action: PayloadAction<Paginated<ITribute>>) => {
      state.tributes = action.payload
    },

    addNewTribute: (state, action: PayloadAction<ITribute>) => {
      if (state.tributes) {
        state.tributes.items = [action.payload, ...state.tributes.items]
      }
    },

    setToEditTribute: (state, action: PayloadAction<ITribute>) => {
      state.toEditTribute = action.payload
    },

    removeToEditTribute: (state) => {
      state.toEditTribute = null
    },

    removeTributes: (state) => {
      state.tributes = null
    },

    updateTribute: (state, action: PayloadAction<Partial<ITribute>>) => {
      if (state.tributes && action.payload.tributeId) {
        state.tributes.items = state.tributes.items.map((tribute) => {
          if (tribute.tributeId === tribute.tributeId) {
            return { ...tribute, ...action.payload }
          }
          return tribute
        })
      }
    },
  },
})

export const { initializeTributes, setTributes, removeTributes, addNewTribute, setToEditTribute, removeToEditTribute, updateTribute } =
  tributeSlice.actions

export default tributeSlice.reducer

export const selectTributes = (state: AppState) => state.tributes
