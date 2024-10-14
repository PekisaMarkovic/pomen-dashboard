import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable } from '../../interfaces/general'
import { State as AppState } from '../store'
import { ModalEnums } from '../../enum/modal'

type State = {
  modal: Nullable<ModalEnums>
}

const initialState: State = {
  modal: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    initializeModal: () => initialState,
    setModal: (state, action: PayloadAction<ModalEnums>) => {
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
