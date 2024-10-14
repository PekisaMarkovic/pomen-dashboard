import { createSlice } from '@reduxjs/toolkit'
import { State as AppState } from '../store'

type State = {
  isScrollDisabled: boolean
  isSaveDisabled: boolean
}

const initialState: State = {
  isScrollDisabled: false,
  isSaveDisabled: false,
}

const behaviourSlice = createSlice({
  name: 'behaviours',
  initialState,
  reducers: {
    initializeTributes: () => initialState,
    handleDisableScroll: (state) => {
      state.isScrollDisabled = true
    },

    handleAllowScroll: (state) => {
      state.isScrollDisabled = false
    },

    handleDisableSave: (state) => {
      state.isSaveDisabled = true
    },

    handleAllowSave: (state) => {
      state.isSaveDisabled = false
    },
  },
})

export const { handleDisableScroll, handleAllowScroll, handleDisableSave, handleAllowSave } = behaviourSlice.actions

export default behaviourSlice.reducer

export const selectBehaviours = (state: AppState) => state.behaviours
