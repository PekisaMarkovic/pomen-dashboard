import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ModalTypes, Nullable } from '../../interfaces/general'
import { State as AppState } from '../store'

type State = {
  modal: Nullable<ModalTypes>
}

const initialState: State = {
  modal: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    initializeModal: () => initialState,
    setModal: (state, action: PayloadAction<ModalTypes>) => {
      state.modal = action.payload
    },
    removeModal: (state) => {
      state.modal = null
    },
  },
})

export const { initializeModal, setModal, removeModal } = modalSlice.actions

export default modalSlice.reducer

export const selectModal = (state: AppState) => state.modal
